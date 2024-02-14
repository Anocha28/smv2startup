import mongoose from "mongoose"

const shipmentSchema = mongoose.Schema({
    sale : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    agent : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    awb: {
        type: String,
        required: true,
    },
    totalWeight: {
        type: Number,
        required: true
    },    
    isPaid: {
        type: Boolean,
        default: false
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isInvoiced: {
        type: Boolean,
        default: false
    },
    smInvoiceNo: {
        type: String,
        default: ''
    },
    dhlInvoiceNo: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date
    },
    charges: [
        {
            name: String,
            amount: Number,
        }
    ],
    customerDetails: {
        shipperDetails: {
            postalAddress: {
                postalCode: String,
                cityName: String,
                countryCode: String,
                countryName: String,
                addressLine1: String,
                addressLine2: String,
                addressLine3: String,
            },
            contactInformation: {
                email: String,
                phone: String,
                companyName: String,
                fullName: String
            }
        },
        receiverDetails: {
            postalAddress: {
                postalCode: String,
                cityName: String,
                countryCode: String,
                countryName: String,
                addressLine1: String,
                addressLine2: String,
                addressLine3: String,
            },
            contactInformation: {
                email: String,
                phone: String,
                companyName: String,
                fullName: String
            }
        }
    },
    content: {
        packages: [
            {
                dimensions: {
                    length: Number,
                    width: Number,
                    height: Number
                },
                weight: Number
            }
        ]
    },
    
})

const Shipment = mongoose.model('Shipment', shipmentSchema)
export default Shipment