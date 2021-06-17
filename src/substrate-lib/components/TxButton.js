import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { web3FromSource } from '@polkadot/extension-dapp';
import TxStatus from '../../utils/TxStatus';

import { useSubstrate } from '../';
import utils from '../utils';

function TxButton ({
  accountPair = null,
  label,
  setStatus,
  color = 'blue',
  style = null,
  type = 'QUERY',
  attrs = null,
  disabled = false
}) {
  // Hooks
  const { api } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [sudoKey, setSudoKey] = useState(null);

  const { palletRpc, callable, inputParams, paramFields, onSuccess, onFailure } = attrs;

  const isQuery = () => type === 'QUERY';
  const isSudo = () => type === 'SUDO-TX';
  const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX';
  const isUnsigned = () => type === 'UNSIGNED-TX';
  const isSigned = () => type === 'SIGNED-TX';
  const isRpc = () => type === 'RPC';

  const loadSudoKey = () => {
    (async function () {
      if (!api || !api.query.sudo) { return; }
      const sudoKey = await api.query.sudo.key();
      sudoKey.isEmpty ? setSudoKey(null) : setSudoKey(sudoKey.toString());
    })();
  };

  useEffect(loadSudoKey, [api]);

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = accountPair;
    let fromAcct;

    // signer is from Polkadot-js browser extension
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = accountPair;
    }

    return fromAcct;
  };

  const txResHandler = ({ status, events, dispatchError }) => {
    if (dispatchError && status.isFinalized) {
      setStatus(TxStatus.failed(status.asFinalized.toString()));
      onFailure && onFailure();
    } else if (dispatchError && status.isInBlock) {
      setStatus(TxStatus.failed(status.asInBlock.toString()));
      onFailure && onFailure();
    } else if (status.isFinalized) {
      setStatus(TxStatus.finalized(status.asFinalized.toString()));
      onSuccess && onSuccess();
    } else {
      setStatus(TxStatus.processing(null, status.type));
    }
  };

  const sudoTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = await transformParams(paramFields, inputParams);
    try {
      const txExecute = transformed
        ? api.tx.sudo.sudo(api.tx[palletRpc][callable](...transformed))
        : api.tx.sudo.sudo(api.tx[palletRpc][callable]());
      const unsub = txExecute.signAndSend(fromAcct, txResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const uncheckedSudoTx = async () => {
    const fromAcct = await getFromAcct();
    try {
      const txExecute =
      api.tx.sudo.sudoUncheckedWeight(api.tx[palletRpc][callable](...inputParams), 0);
      const unsub = txExecute.signAndSend(fromAcct, txResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const signedTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = await transformParams(paramFields, inputParams);

    try {
      const txExecute = transformed
        ? api.tx[palletRpc][callable](...transformed)
        : api.tx[palletRpc][callable]();
      const unsub = await txExecute.signAndSend(fromAcct, txResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const unsignedTx = async () => {
    const transformed = await transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    try {
      const txExecute = transformed
        ? api.tx[palletRpc][callable](...transformed)
        : api.tx[palletRpc][callable]();
      const unsub = await txExecute.send(txResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const queryResHandler = result =>
    result.isNone ? setStatus('None') : setStatus(result.toString());

  const query = async () => {
    const transformed = await transformParams(paramFields, inputParams);
    try {
      const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const rpc = async () => {
    const transformed = await transformParams(paramFields, inputParams, { emptyAsNull: false });
    try {
      const unsub = await api.rpc[palletRpc][callable](...transformed, queryResHandler);
      setUnsub(() => unsub);
    } catch (error) {
      setStatus(TxStatus.failed(null, error.toString()));
      onFailure && onFailure();
    }
  };

  const transaction = async () => {
    if (unsub) {
      unsub();
      setUnsub(null);
    }

    setStatus(TxStatus.processing(null, 'Sending...'));

    (isSudo() && sudoTx()) ||
    (isUncheckedSudo() && uncheckedSudoTx()) ||
    (isSigned() && signedTx()) ||
    (isUnsigned() && unsignedTx()) ||
    (isQuery() && query()) ||
    (isRpc() && rpc());
  };

  const transformParams = async (paramFields, inputParams, opts = { emptyAsNull: true }) => {
    if (typeof inputParams === 'function') {
      setStatus(TxStatus.processing(null, 'Generating payload...'));
      inputParams = [await inputParams()];
    }

    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
      if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map(e => e.trim());
        converted = converted.map(single => isNumType(type)
          ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
          : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };

  const isNumType = type =>
    utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

  const allParamsFilled = () => {
    if (typeof inputParams === 'function') { return true; }
    if (paramFields.length === 0) { return true; }

    return paramFields.every((paramField, ind) => {
      const param = inputParams[ind];
      if (paramField.optional) { return true; }
      if (param == null) { return false; }

      const value = typeof param === 'object' ? param.value : param;
      return value !== null && value !== '';
    });
  };

  const isSudoer = acctPair => {
    if (!sudoKey || !acctPair) { return false; }
    return acctPair.address === sudoKey;
  };

  return (
    <Button
      basic
      color={color}
      style={style}
      type='submit'
      onClick={transaction}
      disabled={ disabled || !palletRpc || !callable || !allParamsFilled() ||
        ((isSudo() || isUncheckedSudo()) && !isSudoer(accountPair)) }
    >
      {label}
    </Button>
  );
}

TxButton.propTypes = {
  accountPair: PropTypes.object,
  setStatus: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'QUERY', 'RPC', 'SIGNED-TX', 'UNSIGNED-TX', 'SUDO-TX', 'UNCHECKED-SUDO-TX',
    'CONSTANT']).isRequired,
  attrs: PropTypes.shape({
    palletRpc: PropTypes.string,
    callable: PropTypes.string,
    inputParams: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    paramFields: PropTypes.array,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
  }).isRequired
};

function TxGroupButton (props) {
  return (
    <Button.Group>
      <TxButton
        label='Unsigned'
        type='UNSIGNED-TX'
        color='grey'
        {...props}
      />
      <Button.Or />
      <TxButton
        label='Signed'
        type='SIGNED-TX'
        color='blue'
        {...props}
      />
      <Button.Or />
      <TxButton
        label='SUDO'
        type='SUDO-TX'
        color='red'
        {...props}
      />
    </Button.Group>
  );
}

export { TxButton, TxGroupButton };
