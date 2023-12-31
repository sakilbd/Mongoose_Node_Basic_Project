import { Model } from "mongoose";

export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type Student = {
    id: string;
    name: UserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddres: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
};


// export type StudentMethods = {
//     isUserExists(id: string): Promise<Student>
// }

// export type StudentModel = Model<Student, Record<string, never>, StudentMethods>;