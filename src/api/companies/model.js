import mongoose, { Schema } from 'mongoose'

const companiesSchema = new Schema({
    name: {
      type: String
    },
    createdBy: {
      type: Object
    },
    admin: {
      type: Object
    }
}, {
    timestamps: true
});

companiesSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        name: this.name,
        createdBy: this.createdBy,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        admin: this.admin,
      }

      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Companies', companiesSchema)

export const schema = model.schema
export default model