import React from 'react';
import { Form, RadioInput, CheckBoxInput } from '@medeo/form';

const Cha2ds2vascForm = ({ onSubmit: onSubmitProps }) => {
  const onSubmit = (inputs) => {
    if ((inputs.vItemA === undefined || inputs.vItemA === 1) && inputs.vItemSc !== undefined) {
      delete inputs.vItemSc;
    }
    const values = Object.values(inputs).map(value => Number.parseInt(value, 10));
    const result = values.reduce((sum, value) => sum + value, 0);
    const feedback = (
      <span>
        Interprétation:
     Le score CHA2DS2-VASc permet d'estimer le risque d'embolie artérielle lors d'une fibrillation auriculaire sans maladie valvulaire mitrale. Il permet d'aider à la décision de la mise en place d'un traitement anticoagulant ou non.
     Le sexe féminin ne compte que si la patiente a 65 ans ou plus (recommendations 2012).
     Recommendations:
       - Score à 0, FA isolée idiopathique : pas d'anticoagulation ni d'aspirine.
       - Score à 1 : anticoagulants ou aspirine après évaluation de la balance bénéfice risque type score HAS-BLED et des préférences du patient.
       - Score supérieur ou égal à 2 : indication formelle d'anticoagulation sous réserve d'un score de risque hémorragique acceptable.
      </span>);
    return onSubmitProps(feedback, result);
  };


  return (
    <Form onSubmit={onSubmit}>
      <h1>CHA<sub>2</sub>DS<sub>2</sub>-VASc</h1>
      <CheckBoxInput label={"Insuffisance cardiaque ou fraction d'éjection diminué."} name="vItemC" id="vItemC"
                     value={1}/>
      <CheckBoxInput label={'Hypertension artérielle.'} name="vItemH" id="vItemH" value={1}/>
      <CheckBoxInput label={'Diabète.'} name="vItemD" id="vItemD" value={1}/>
      <CheckBoxInput label={"Antécédent d'accident vasculaire-cérébral."} name="vItemS" id="vItemS" value={2}/>
      <CheckBoxInput
        label={'Antécédent de maladie vasculaire (artériopathie oblitérante des membres inférieurs, infarctus du myocarde...).'}
        name="vItemV" id="vItemV" value={1}/>
      <RadioInput label={'Âge compris inférieur à 65'} name="vItemA" id="vItemA" value={0} defaultChecked/>
      <RadioInput label={'Âge compris entre 65 et 74 ans.'} name="vItemA" id="vItemA1" value={1}/>
      <RadioInput label={'Âge supérieur à 75 ans.'} name="vItemA" id="vItemA2" value={2}/>
      <CheckBoxInput label={'Femme.'} name="vItemSc" id="vItemSc" value={1}/>
      <button>submit</button>
    </Form>
  )
}


export default Cha2ds2vascForm;