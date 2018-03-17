import mongoose, { Schema } from 'mongoose'

const employeesSchema = new Schema({
    name: {
        type: String
    },
    code: {
      type: String
    },
    createdBy: {
      type: Object
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    resourceManager: {
      type: Object
    },
    companyid: {
      type: Object
    }
}, {
    timestamps: true
});

employeesSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        name: this.name,
        code: this.code,
        createdBy: this.createdBy,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        email: this.email,
        resourceManager: this.resourceManager,
        companyid: this.companyid,
      }

      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Employees', employeesSchema)

export const schema = model.schema
export default model