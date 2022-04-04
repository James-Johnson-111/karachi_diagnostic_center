import React, { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

// const MedicalFirstExamination = lazy( () => import('./MedicalFirstExamination/MedicalFirstExamination') );
const Candidateinformation = lazy( () => import('./CandidateInformation/CandidateInformation') );
const MedicalFirstExamination = lazy( () => import('./MedicalFirstExamination/MedicalFirstExamination') );
const MedicalSecondExamination = lazy( () => import('./MedicalSecondExamination/MedicalSecondExamination') );
const LaboratoryInformation = lazy( () => import('./LaboratoryInformation/LaboratoryInformation') );
const Candidate = () => {

    const Sus = ( props ) => {
  
      return <Suspense fallback={ <div>Loading...</div> }> { props.content } </Suspense>
  
    }

    return (
        <div>

            <Switch>
                <Route exact path="/candidate" render={ () => <h1>Candidate Info</h1> } />
                <Route exact path="/candidate/view=info" render={ () => <Sus content={ <Candidateinformation /> } /> } />
                <Route exact path="/candidate/view=exam1" render={ () => <Sus content={ <MedicalFirstExamination /> } /> } />
                <Route exact path="/candidate/view=exam2" render={ () => <Sus content={ <MedicalSecondExamination /> } /> } />
                <Route exact path="/candidate/view=labinvestigation" render={ () => <Sus content={ <LaboratoryInformation /> } /> } />
            </Switch>
            
            {/* <Route exact path="/candidate/view=examination1" render={ () => <Sus content={ <MedicalFirstExamination /> } /> } /> */}
            
        </div>
    );
    
}

export default Candidate;