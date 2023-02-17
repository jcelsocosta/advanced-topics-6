const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("worker.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const workerPackage = grpcObject.workerPackage;

const client = new workerPackage.Worker("localhost:4000", grpc.credentials.createInsecure());

client.operation({
    "paramOne": 10,
    "operation": "/",
    "paramTwo": 20
}, (error, response) => {
    console.log('rcv server', response)
})