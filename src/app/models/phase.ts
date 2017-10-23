import { StatePhase } from './state-phase.enum' 
import { Convocatory } from './convocatory';

export class Phase {    
    id: number;
    name: string;
    description: string;    
    startDate: string;
    endDate: string;
    startApprovalDate: string;    
    endApprovalDate: string;
    convocatory: Convocatory;
}