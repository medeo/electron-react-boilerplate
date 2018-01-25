import React from 'react';
import { Form, CheckBoxInput, RadioInput } from '@medeo/form';
import ScoreQuestion from './ScoreQuestion';

const FagerstromForm = ({ onChange: onPropsSubmit }) => {
  const onChange = (inputs) => {
    const values = Object.values(inputs).map(value => Number.parseInt(value, 10));
    const result = values.reduce((sum, value) => sum + value, 0);
    
    return onPropsSubmit(result);
  }
  return (
    <Form onChange={onChange}>
      <ScoreQuestion>
        <span>Le matin, combien de temps aprés être réveillé(e) fumez-vous votre première cigarette ?</span>
      </ScoreQuestion>
      <RadioInput label={"0 - Plus de 60 minutes."} name="vItem1" id="vItem1.0" type="radio" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"1 - De 31 à 60 minutes."} name="vItem1" id="vItem1.1" type="radio" value="1"/>
      <RadioInput label={"2 - De 6 à 30 minutes."} name="vItem1" id="vItem1.2" type="radio" value="2"/>
      <RadioInput label={"3 - Dans les 5 minutes."} name="vItem1" id="vItem1.3" type="radio" value="3"/>
      <ScoreQuestion>
        <span> Trouvez vous difficile de vous abstenir de fumer dans les endroits où c'est interdit ? </span>
      </ScoreQuestion>
      <RadioInput label={"0 - Non."} name="vItem2" id="vItem2.0" type="radio" value="0" defaultChecked="checked"/>
      <RadioInput label={"1 - Oui."} name="vItem2" id="vItem2.1" type="radio" value="1"/>

      <ScoreQuestion>
        <span>A quelle cigarette renonceriez-vous le plus difficilement ?</span>
      </ScoreQuestion>

      <RadioInput label={"0 - A une au cours de la journée."} name="vItem3" id="vItem3.0" type="radio" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"1 - A la première de la journée."} name="vItem3" id="vItem3.1" type="radio" value="1"/>

      <ScoreQuestion>
        <span>Combien de cigarette fumez-vous par jour en moyenne ?</span>
      </ScoreQuestion>


      <RadioInput label={"0 - 10 ou moins."} name="vItem4" id="vItem4.0" type="radio" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"1 - De 11 à 20."} name="vItem4" id="vItem4.1" type="radio" value="1"/>
      <RadioInput label={"2 - De 21 à 30."} name="vItem4" id="vItem4.2" type="radio" value="2"/>
      <RadioInput label={"3 - Plus de 30."} name="vItem4" id="vItem4.3" type="radio" value="3"/>

      <ScoreQuestion>
        <span>Fumez-vous à intervalles plus rapprochés durant les premièresheures de la matinée que durant le reste de la journée ?</span>
      </ScoreQuestion>

      <RadioInput label={"0 - Non"} name="vItem5" id="vItem5.0" type="radio" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"1 - Oui"} name="vItem5" id="vItem5.1" type="radio" value="1"/>

      <ScoreQuestion>
        <span>Fumez-vous lorsque vous êtes malade au point de devoir resterau lit presque toute la journée ?</span>
      </ScoreQuestion>

      <RadioInput label={"0 - Non."} name="vItem6" id="vItem6.0" type="radio" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"1 - Oui."} name="vItem6" id="vItem6.1" type="radio" value="1"/>
    </Form>
  );
}

export default FagerstromForm;
