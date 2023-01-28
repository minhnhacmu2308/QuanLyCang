import { ContainerModel } from "../models/index.js";
export default {
    Query: {
        containers: async() => {
            const containers = await ContainerModel.find();
            return containers;
        },
    },
    Mutation: {
        //Container
        addContainer: async(parent, args) => {
            const newContainer = new ContainerModel(args);
            await newContainer.save();
            return newContainer;
        },
        deleteContainer: async(parent, args) => {
            let containerId = args._id;
            const container = await ContainerModel.findById(containerId);

            if (container != null) {
                await container.remove();
                return true;
            } else {
                return false;
            }
        },
        updateContainer: async(parent, args) => {
            const containerId = args._id;
            const result = await ContainerModel.findByIdAndUpdate(containerId, {
                name: args.name,
                color:args.color,
                owner:args.owner,
                size:args.size
            });
            return result;
        },
    },
};