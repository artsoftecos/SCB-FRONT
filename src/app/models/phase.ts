import { StatePhase } from './state-phase.enum' 

export class Phase {    
    id: number;
    name: string;
    description: string;
    state: StatePhase;
    startDate: string;
    finishDate: string;
    startApprovalPostulation: string;
    resultDate: string;
}
