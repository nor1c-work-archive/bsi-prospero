import { Injectable } from "@nestjs/common";
import { ExtendedRequest, FillingStatusEnum, QuarterQEnum } from "apps/api/src/common";
import { PageOptionsDto } from "apps/api/src/core";
import { MonitorMapper } from "../mapper/monitor.mapper";
import { MonitorServiceInterface } from "../interfaces/monitor.service.interface";
import { LproFollowUpDto, LproProgressDto, MonitorDto } from "../dto/monitor.dto";
import { SummaryResponse } from "@app/common";

@Injectable()
export class MonitorService implements MonitorServiceInterface {
    
    async findAllProgressLpro(req: ExtendedRequest, options: LproProgressDto): Promise<any> {
        return MonitorMapper.toList(DataDummyProgressLpro)
    }

    async findAllFollowUpLpro(req: ExtendedRequest, options: LproFollowUpDto): Promise<any> {
        return MonitorMapper.toListFollowUpLpro(DataDummyFollowUpLpro)
    }

    async findAllCtImplementation(req: ExtendedRequest, options: MonitorDto): Promise<any> {
        return MonitorMapper.toListCtImplementation(DataDummyCtImplementation)
    }

    async findAllFollowUpCt(req: ExtendedRequest, options: MonitorDto): Promise<any> {
        return MonitorMapper.toListCtFollowUp(DataDummyCtFollowUp)
    }

    async findAll(req: ExtendedRequest, options: PageOptionsDto): Promise<any> {
        
    }

    async findOne(req: ExtendedRequest, options: PageOptionsDto): Promise<any> {
        const data = [{
            name : 'JARINGAN',
            completed : 1899,
            total : 40,
            percentage: 40
        },{
            name : 'KANTOR PUSAT',
            completed : 1234,
            total : 40,
            percentage: 40
        }];
        const result = SummaryResponse(data,'CT');
    }

    async summary(req: ExtendedRequest): Promise<any> {
        
    }
}

const DataDummyProgressLpro = [
    {
        "id": 1,
        "unit": "Regional Sumatra",
        "type": "region",
        "status": "APPROVED",
        "jumlahArea": 24,
        "progress": {
            "rcsa": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "led": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "kri": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "iam": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "all": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            }
        },
        "activities": [
            {
                "unitKerja": "Area",
                "activity": "RCSA Operational",
                "progress": 60,
                "approvalHistory": [
                    {
                        "status": "Approved",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Waiting for Approval",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Submitted",
                        "user": "Cabang",
                        "date": "2022-08-24"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "unit": "Area Malang",
        "type": "area",
        "status": "APPROVED",
        "jumlahArea": 24,
        "progress": {
            "rcsa": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "led": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "kri": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "iam": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "all": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            }
        },
        "activities": [
            {
                "unitKerja": "Cabang 2",
                "activity": "RCSA Operational",
                "progress": 60,
                "approvalHistory": [
                    {
                        "status": "Approved",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Waiting for Approval",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Submitted",
                        "user": "Cabang",
                        "date": "2022-08-24"
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "unit": "KC Bekasi 1",
        "type": "branch",
        "status": "APPROVED",
        "jumlahArea": null,
        "progress": {
            "rcsa": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "led": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "kri": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "iam": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            }
        }
    },
    {
        "id": 4,
        "unit": "Policy & Procedure Group",
        "type": "group",
        "status": "ON PROGRESS",
        "jumlahArea": null,
        "progress": {
            "rcsa": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "led": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "kri": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "iam": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            }
        }
    },
    {
        "id": 5,
        "unit": "Directorat 1",
        "type": "directorat",
        "status": "ON PROGRESS",
        "jumlahArea": 24,
        "progress": {
            "rcsa": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "led": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "kri": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "iam": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            },
            "all": {
                "total": 100,
                "completed": 60,
                "percentage": 60,
            }
        },
        "activities": [
            {
                "unitKerja": "Group 1",
                "activity": "RCSA Operational",
                "progress": 60,
                "approvalHistory": [
                    {
                        "status": "Approved",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Waiting for Approval",
                        "user": "AOSM",
                        "date": "2022-08-25"
                    },
                    {
                        "status": "Submitted",
                        "user": "Cabang",
                        "date": "2022-08-24"
                    }
                ]
            }
        ]
    }
]

const DataDummyFollowUpLpro = [
    {
        id: 1,
        activity: 'RCSA Segmen Operasional',
        workUnit: 'Area 1',
        period: 2022,
        quarter: QuarterQEnum.Q1,
        progress: 100,
        status: FillingStatusEnum.APPROVED,
        approvalHistory: [
            {
                date: '2023-08-01',
                user: 'AOSM',
                status: 'Approved',
            },
            {
                date: '2023-07-31',
                user: 'Cabang',
                status: 'Submitted',
            },
        ],
    },
    {
        id: 2,
        activity: 'KRI',
        workUnit: 'Area 3',
        period: 2022,
        quarter: QuarterQEnum.Q2,
        progress: 100,
        status: FillingStatusEnum.FINAL_APPROVED,
        approvalHistory: [
            {
                date: '2023-08-01',
                user: 'AOSM',
                status: 'Approved',
            },
            {
                date: '2023-07-31',
                user: 'Cabang',
                status: 'Submitted',
            },
        ],
    },
]

const DataDummyCtImplementation = [
    {
        id: 1,
        activity: 'CT',
        workUnit: 'Area 2',
        pic: 'Area Batam KC Tanjung',
        progress: 60,
        approvalHistory: [
            {
                date: '2023-08-01',
                user: 'AOSM',
                status: 'Approved',
            },
            {
                date: '2023-07-31',
                user: 'Cabang',
                status: 'Submitted',
            },
        ],
    },
    {
        id: 2,
        activity: 'CT',
        workUnit: 'Area 2',
        pic: 'Area Batam KC Tanjung',
        progress: 60,
        approvalHistory: [
            {
                date: '2023-08-01',
                user: 'AOSM',
                status: 'Approved',
            },
            {
                date: '2023-07-31',
                user: 'Cabang',
                status: 'Submitted',
            },
        ],
    }
]

const DataDummyCtFollowUp = [
    {
        id: 1,
        activity: 'CT',
        workUnit: 'Area 1',
        followUp: 'RCSA Tidak Lanjut',
        pic: 'Area Batam KC Tanjung',
        dueDate: '2022-03-12',
        overdue: '2022-03-13',
    },
    {
        id: 2,
        activity: 'CT',
        workUnit: 'Area 1',
        followUp: 'RCSA Tidak Lanjut',
        pic: 'Area Batam KC Tanjung',
        dueDate: '2022-03-15',
        overdue: null,
    }
]