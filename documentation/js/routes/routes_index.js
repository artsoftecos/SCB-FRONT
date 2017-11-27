var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/home","pathMatch":"full"},{"path":"home","component":"HomeComponent"},{"path":"login","component":"LoginComponent"},{"path":"form","component":"FormComponent"},{"path":"register","component":"RegisterComponent"},{"path":"upload_document","component":"UploadDocumentsComponent"},{"path":"HomeAdministrator","component":"AdministratorComponent","children":[]}],"kind":"module"},{"name":"routes","filename":"src/app/applicant/applicant-routing.module.ts","module":"ApplicantRoutingModule","children":[{"path":"HomeApplicant","component":"HomeComponent","children":[]},{"path":"PhaseToApply/:id","component":"PhaseToApplyConvocatoryComponent"},{"path":"form/:id","component":"FormComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/convocatory/convocatory-routing.module.ts","module":"ConvocatoryRoutingModule","children":[{"path":"convocatory/:id","component":"DetailedConvocatoryComponent"},{"path":"approveApplicants/:id","component":"ConvocatoryPendingApprovePhasesComponent"},{"path":"phase/:id","component":"DetailedPhaseComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/offerer/offerer-routing.module.ts","module":"OffererRoutingModule","children":[{"path":"HomeOfferer","component":"HomeComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/security/security-routing.module.ts","module":"SecurityRoutingModule","children":[{"path":"home","component":"HomeComponent"}],"kind":"module"}]}