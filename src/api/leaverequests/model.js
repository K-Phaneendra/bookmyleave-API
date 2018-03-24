import mongoose, { Schema } from 'mongoose'

const leaveRequestsSchema = new Schema({
    from: {
      type: Object
    },
    to: {
      type: Object
    },
    createdBy: {
      type: Object
    },
    leaveDate: {
      type: Object
    },
    leaveReason: {
      type: String
    },
    status: {
      type: String
    },
    companyid: {
      type: Object
    }
}, {
    timestamps: true
});

leaveRequestsSchema.methods = {
    view (full) {
      const view = {
        id: this.id,
        from: this.from,
        to: this.to,
        createdBy: this.createdBy,
        leaveDate: this.leaveDate,
        leaveReason: this.leaveReason,
        status: this.status,
        companyid: this.companyid,
      }

      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Leaverequests', leaveRequestsSchema)

export const schema = model.schema
export default model