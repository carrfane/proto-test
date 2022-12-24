import grpc from 'grpc';
import protobuf from 'protobufjs';


(() => {
  protobuf.load('./definitions/test.proto', (err, root) => {
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

    const Greeter = root.lookup('Greeter');
    const greeter = Greeter.create(rpcImpl, false, false);

    greeter.sayHello({ name: 'you' }, function(err, response) {
      if (err) {
        console.log('Error:', err);
        return;
      }

      console.log('Greeting:', response.message);
  });
  });
})();
