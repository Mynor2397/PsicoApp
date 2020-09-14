import React, {Component} from 'react' 
import Navbar from '../Navbar/Navbar'
import EtapaDiagnostico from './wizard/EtapaDiagnostico'
import EtapaInicial from './wizard/EtapaInicial'
import EtapaIntermedia from './wizard/EtapaIntermedia'
import './Etapas.scss'

class Etapas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCase: props.match.params.idCasos,
      currentStep: 1,
      premorbidPersonality:'',
      premorbidPersonalityFile:'',
      currentProblem:'',
      currentProblemFile:'',
      healthHistory:'',
      healthHistoryFile:'',
      sexualHistory:'',
      sexualHistoryFile:'',
      growthHistory:'',
      growthHistoryFile:'',
      perinatalHistory:'',
      perinatalHistoryFile:'',
      familyHistory:'',
      familyHistoryFile:'',
      genogramFile:'',
      schoolHistory:'',
      schoolHistoryFile:'',
      workHistory:'',
      workHistoryFile:'',
      mentalEvaluationTest:'',
      mentalEvaluationTestFile:'',
      clinicalInterpretation:'',
      clinicalInterpretationFile:'',
      interpreationOfEvidence:'',
      interpreationOfEvidenceFile:'',
      therapeuticContract:'',
      therapeuticContractFile:'',
      uuidTestingApplication:'',
      uuidTestType:'',
      testingApplication:'',
      testingApplicationFile:'', 
    }
  }

  componentDidMount() {
    console.log('hola')
    const url = `http://localhost:4000/caseinitial/only/${this.state.idCase}`
    fetch(url)
      .then(rest => rest.json())
      .then(data => {
        this.setState({
          premorbidPersonality: data.data[0].premorbidPersonality || '',
          premorbidPersonalityFile: data.data[0].premorbidPersonalityFile || '',
          currentProblem: data.data[0].currentProblem || '',
          currentProblemFile: data.data[0].currentProblemFile || '',
          healthHistory: data.data[0].healthHistory || '',
          healthHistoryFile: data.data[0].healthHistoryFile || '',
          sexualHistory: data.data[0].sexualHistory || '',
          sexualHistoryFile: data.data[0].sexualHistoryFile || '',
          growthHistory: data.data[0].growthHistory || '',
          growthHistoryFile: data.data[0].growthHistoryFile || '',
          perinatalHistory: data.data[0].perinatalHistory || '',
          perinatalHistoryFile: data.data[0].perinatalHistoryFile || '',
          familyHistory: data.data[0].familyHistory || '',
          familyHistoryFile: data.data[0].familyHistoryFile || '',
          genogramFile: data.data[0].genogramFile || '',
          schoolHistory: data.data[0].schoolHistory || '',
          schoolHistoryFile: data.data[0].schoolHistoryFile || '',
          workHistory: data.data[0].workHistory || '',
          workHistoryFile: data.data[0].workHistoryFile || '',
          mentalEvaluationTest: data.data[0].mentalEvaluationTest || '',
          mentalEvaluationTestFile: data.data[0].mentalEvaluationTestFile || '',
          clinicalInterpretation: data.data[0].clinicalInterpretation || '',
          clinicalInterpretationFile: data.data[0].clinicalInterpretationFile || '',
          interpreationOfEvidence: data.data[0].interpreationOfEvidence || '',
          interpreationOfEvidenceFile: data.data[0].interpreationOfEvidenceFile || '',
          therapeuticContract: data.data[0].therapeuticContract || '',
          therapeuticContractFile: data.data[0].therapeuticContractFile || '',
          testingApplication: data.data[0].testingApplication || '',
          testingApplicationFile: data.data[0].testingApplicationFile || ''
        })
      })
      .catch(err => console.log(err))
  }

  handleChange = event => {
    const url = `http://localhost:4000/caseinitial/create/${this.state.idCase}`
    if(event.is) {
      const {name, value} = event
      if (value) {
        this.setState({
          [name]: value
        })

        const data = {
          [name]: value
        }
        console.log(data)
        fetch(url, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
      }
    }else {
      const {name} = event.target
      const file = event.target.files[0]
      
      const formData = new FormData()

      formData.append([name],file)
      console.log(formData.get([name]))
      
      this.setState({
        [name]: file
      })    

      fetch(url, {
        method:'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    }

  }
   
  handleSubmit = event => {
    event.preventDefault()
    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
    return (
      <>
      <Navbar />
      <div className="ed-container mt-6">
        <div className="ed-item">
          <h1>Etapas</h1>
          <p>Step {this.state.currentStep} </p> 
        </div>
        <div className="ed-item ed-container mb-6">
          {/* <form onSubmit={this.handleSubmit}> */}
            <EtapaInicial 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              premorbidPersonality={this.state.premorbidPersonality}
              premorbidPersonalityFile={this.state.premorbidPersonalityFile}
              currentProblem={this.state.currentProblem}
              currentProblemFile={this.state.currentProblemFile}
              healthHistory={this.state.healthHistory}
              healthHistoryFile={this.state.healthHistoryFile}
              sexualHistory={this.state.sexualHistory}
              sexualHistoryFile={this.state.sexualHistoryFile}
              growthHistory={this.state.growthHistory}
              growthHistoryFile={this.state.growthHistoryFile}
              perinatalHistory={this.state.perinatalHistory}
              perinatalHistoryFile={this.state.perinatalHistoryFile}
              familyHistory={this.state.familyHistory}
              familyHistoryFile={this.state.familyHistoryFile}
              genogramFile={this.state.genogramFile}
              schoolHistory={this.state.schoolHistory}
              schoolHistoryFile={this.state.schoolHistoryFile}
              workHistory={this.state.workHistory}
              workHistoryFile={this.state.workHistoryFile}
              mentalEvaluationTest={this.state.mentalEvaluationTest}
              mentalEvaluationTestFile={this.state.mentalEvaluationTestFile}
              clinicalInterpretation={this.state.clinicalInterpretation}
              clinicalInterpretationFile={this.state.clinicalInterpretationFile}
              interpreationOfEvidence={this.state.interpreationOfEvidence}
              interpreationOfEvidenceFile={this.state.interpreationOfEvidenceFile}
              therapeuticContract={this.state.therapeuticContract}
              therapeuticContractFile={this.state.therapeuticContractFile}
              uuidTestingApplication={this.state.uuidTestingApplication}
              uuidTestType={this.state.uuidTestType}
              testingApplication={this.state.testingApplication}
              testingApplicationFile={this.state.testingApplicationFile}
            />
            <EtapaDiagnostico 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
            />

            <EtapaIntermedia
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
            />
            <div className="ed-item">
              {this.previousButton()}
              {this.nextButton()}

            </div>
          {/* </form> */}
        </div>
      </div>
      </>
    );
  }
}

export default Etapas