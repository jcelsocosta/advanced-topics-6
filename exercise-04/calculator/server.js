const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("worker.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const workerPackage = grpcObject.workerPackage;


const server = new grpc.Server()

server.bind("0.0.0.0:4000", grpc.ServerCredentials.createInsecure());
server.addService(workerPackage.Worker.service, {
    "operation": operation
})

server.start()

function operation(call, callback) {
    const { paramOne , paramTwo, operation } = call.request
    // console.log(call.request)
    console.log(paramOne , paramTwo, operation)

    let response = undefined
    switch (operation) {
        case '+':
            response = paramOne + paramTwo
        break;
        case '-':
            response = paramOne - paramTwo
        break;
        case '*':
            response = paramOne * paramTwo
        break;
        case '/':
            response = paramOne / paramTwo
        break;
        default:
            response = 'error ao efetuar operação'
    }

    callback(null, {"response": response})
    console.log('await', {"response": response})
}