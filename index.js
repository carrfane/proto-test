import protobuf from 'protobufjs';
import grpc from 'grpc';

(() => {
  protobuf.load('./definitions/api.proto', (err, root) => {
    const Client = grpc.makeGenericClientConstructor({});
    const client = new Client('localhost:50051', grpc.credentials.createInsecure());
    
    const rpcImpl = function(method, requestData, callback) {
      client.makeUnaryRequest(
        method.name,
        arg => arg,
        arg => arg,
        requestData,
        callback
      )
    }

    const Protocol = root.lookup('Client');


    const payload = {
      walletId: '123',
      currency: 1
    };


    const protocol = Protocol.create(rpcImpl, false, false);

    protocol.Client({ walletId: '1234', currency: 1 }, (err, response) => {
      console.log(err, response);
     });
  });
})();
