import React from 'react';
import { Form, CheckBoxInput } from '@medeo/form';

const HASBLEDForm = ({ onSubmit: onSubmitProps}) => {
  const onSubmit = (inputs) => {
    const values = Object.values(inputs)
      .filter(value => value !== false)
      .map(value => Number.parseInt(value, 10));
    const result = values.reduce((sum, value) => sum + value, 0);
    const feedback = (
      <span>
        Le score HAS-BLED permet d'estimer le risque hémorragique chez les patients présentant une fibrillation auriculaire sans maladie valvulaire mitrale. Il permet d'aider à la décision de la mise en place d'un traitement anticoagulant ou non.
         Score inférieur ou égal à 1 : Risque faible, envisager une anticoagulation. Score égal à 2 : anticoagulation envisageable malgré un risque modéré. Score supérieur à 3 : Risque élevé, envisager une alternative à l'anticoagulation
      </span>);
    return onSubmitProps(feedback, result);
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>HAS-BLED</h1>
      <CheckBoxInput value={1} label={"Hypertension artérielle non contrôlée (PAS &ge; 160mmHg)."} name="vItemH" id="vItemH"
                     type="checkbox" />
      <CheckBoxInput value={1} label={"Anomalie fonction rénale (créatinine &ge; 200µmol/l ou transplanatation ou dialyse)."}
                     name="vItemA1" id="vItemA1" type="checkbox" />
      <CheckBoxInput value={1} label={"Anomalie fonction hépatique (maladie hépatique chronique ou cytolyse ou cholestase)."}
                     name="vItemA2" id="vItemA2" type="checkbox" />
      <CheckBoxInput value={1} label={"Accident Vasculaire Cérébral (récent)."} name="vItemS" id="vItemS" type="checkbox"
      />
      <CheckBoxInput value={1} label={"Maladie à risque hémorragie (ulcère, néoplasie, anémie, trouble de coagulation...)."}
                     name="vItemB" id="vItemB" type="checkbox" />
      <CheckBoxInput value={1} label={"INR instable ou élevé."} name="vItemL" id="vItemL" type="checkbox" />
      <CheckBoxInput value={1} label={"Âge supérieur à 65 ans."} name="vItemE" id="vItemE" type="checkbox"
      />
      <CheckBoxInput value={1} label={"Alcoolisme."} name="vItemD1" id="vItemD1" type="checkbox" />
      <CheckBoxInput value={1} label={"Utilisation de médicaments à action antithrompbotique (aspirine, AINS, héparines...)."}
                     name="vItemD2" id="vItemD2" type="checkbox" />
      <button>submit</button>
    </Form>
  )
};

export default HASBLEDForm;