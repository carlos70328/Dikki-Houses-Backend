module.exports = {
    toObject: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    }
} 