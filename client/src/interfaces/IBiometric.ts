export interface IBiometric {
    id: string;
    name: string;
    attendanceId: string;
    memberId: string;
    rfid: string;
    fingerPrint: string;
    face: string;
    device: string;
    service: string;
    status: string;
}

export interface IBiometricFilter {
    name: string;
    input: string;
    service: string;
}
