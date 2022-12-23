import protobuf from 'protobufjs';

(() => {
  protobuf.load('./definitions/api.proto', (err, root) => {
    if (err) throw err;

    const createNewAdderss = root.lookupType('protocol.CreateNewAddressRequest');

    const payload = {
      walletId: '123',
      currency: 1
    };

    const errMsg = createNewAdderss.verify(payload);

    console.log(errMsg)

    const newAdderssMessage = createNewAdderss.create(payload);

    console.log(newAdderssMessage);

    const encondedMessage = createNewAdderss.encode(newAdderssMessage).finish();
    console.log(encondedMessage);

    const decodedMessage = createNewAdderss.decode(encondedMessage);

    console.log(decodedMessage);
  });
})();
