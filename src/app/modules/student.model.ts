import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        trim: true, //removes heading and trailing spaces.
        required: [true, "First Name is Required"], //custom error message syntax
        maxlength: [20, "FirstName Cannot be more than 20 characters"],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not in a capatilzie format',
        }

    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"], //custom error message syntax
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid'
        }
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const localGuradianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not valid' //use given value
        },
        required: true
    },
    dateOfBirth: { type: String },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not email type'
        }
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    presentAddress: { type: String, required: true },
    permanentAddres: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuradianSchema,
        required: true,
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
});

export const StudentModel = model<Student>('Student', studentSchema);