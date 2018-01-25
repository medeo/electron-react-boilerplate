import React from 'react';
import { Form, RadioInput } from '@medeo/form';

const HamiltonForm = ({ onSubmit: onPropsSubmit }) => {
  const onSubmit = (inputs) => {
    const values = Object.values(inputs).map(value => Number.parseInt(value, 10));
    const result = values.reduce((sum, value) => sum + value, 0);
    const feedback = (<span>
          Interprétation:
     L'échelle de dépression de Hamilton est le test le plus utilisé pour évaluer l'intensité des symptômes dépressifs. Il est valable pour toutes les personnes, y compris les personnes âgées bien que certains aspects puissent être parfois inopérants (par ex. ceux qui font référence aux activités professionnelles alors qu'il peut s'agir de personnes en retraite).
     L'évaluation est généralement faite toutes le deux semaines. Plus la note est élevée, plus la dépression est grave :
     Score de 10 à 13 : symptômes dépressifs légers.
     Score de 14 à 17 : symptômes dépressifs légers à modérés.
      </span>)

    return onPropsSubmit(feedback, result);
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Humeur dépressive</h1>
      <RadioInput label={'Absent.'} name="vItem1" id="vItem1.0" value="0" defaultChecked="checked"/>
      <RadioInput label={'Ces états affectifs ne sont signalés que si l\'on interroge le sujet.'} name="vItem1"
                  id="vItem1.1" value="1"/>
      <RadioInput label={'Ces états affectifs sont signalés verbalement spontanément.'} name="vItem1" id="vItem1.2"
                  value="2"/>
      <RadioInput
        label={'Le sujet communique ces états affectifs non verbalement ; par exemple par son expression faciale, son attitude, sa voix et sa tendance à pleurer.'}
        name="vItem1" id="vItem1.3" value="3"/>
      <RadioInput
        label={'Le sujet ne communique pratiquement que ces états affectifs dans ses communications spontanées verbales et non verbales.'}
        name="vItem1" id="vItem1.4" value="4"/>
      <h1>Sentiments de culpabilité</h1>
      <RadioInput label={"Absent."} name="vItem2" id="vItem2.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"S'adresse des reproches à lui-même, a l'impression qu'il a causé un préjudice à des gens."}
                  name="vItem2" id="vItem2.1" value="1"/>
      <RadioInput label={"Idées de culpabilité ou ruminations sur des erreurs passées ou sur des actions condamnables."}
                  name="vItem2" id="vItem2.2" value="2"/>
      <RadioInput label={"La maladie actuelle est une punition. Idées délirantes de culpabilité."} name="vItem2"
                  id="vItem2.3" value="3"/>
      <RadioInput
        label={"Entend des voix qui l'accusent ou le dénoncent et/ou a des hallucinations visuelles menaçantes."}
        name="vItem2" id="vItem2.4" value="4"/>
      <h1>Suicide</h1>
      <RadioInput label={"Absent."} name="vItem3" id="vItem3.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"A l'impression que la vie ne vaut pas la peine d'être vécue."} name="vItem3" id="vItem3.1"
                  value="1"/>
      <RadioInput label={"Souhaite être mort ou équivalent : toute pensée de mort possible dirigée contre lui-même."}
                  name="vItem3" id="vItem3.2" value="2"/>
      <RadioInput label={"Idées ou geste de suicide."} name="vItem3" id="vItem3.3" value="3"/>
      <RadioInput label={"Tentatives de suicide (cocher pour toute tentative sérieuse)."} name="vItem3" id="vItem3.4"
                  value="4"/>
      <h1>Insomnie du début de la nuit</h1>
      <RadioInput label={"Pas de difficulté à s'endormir."} name="vItem4" id="vItem4.0" value="0"
                  defaultChecked="checked"/>
      <RadioInput
        label={"Se plaint de difficultés éventuelles à s'endormir ; par exemple de mettre plus d'une demi-heure."}
        name="vItem4" id="vItem4.1" value="1"/>
      <RadioInput label={"Se plaint d'avoir chaque soir des difficultés à s'endormir."} name="vItem4" id="vItem4.2"
                  value="2"/>
      <h2>Insomnie du milieu de la nuit</h2>
      <RadioInput label={"Pas de difficulté."} name="vItem5" id="vItem5.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Le malade se plaint d'être agité et troublé pendant la nuit."} name="vItem5" id="vItem5.1"
                  value="1"/>
      <RadioInput
        label={"Il se réveille pendant la nuit (cocher pour toutes les fois où le malade se lève du lit sauf si c'est pour uriner)."}
        name="vItem5" id="vItem5.2" value="2"/>
      <h1>Insomnie du matin</h1>
      <RadioInput label={"Pas de difficulté."} name="vItem6" id="vItem6.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Se réveille de très bonne heure le matin mais se rendort."} name="vItem6" id="vItem6.1"
                  value="1"/>
      <RadioInput label={"Incapable de se rendormir s'il se lève."} name="vItem6" id="vItem6.2" value="2"/>
      <h1>Travail et activités</h1>
      <RadioInput label={"Pas de difficulté."} name="vItem7" id="vItem7.0" value="0" defaultChecked="checked"/>
      <RadioInput
        label={"Pensées et sentiments d'incapacité, fatigue ou faiblesse se rapportant à des activités professionnelles ou de détente."}
        name="vItem7" id="vItem7.1" value="1"/>
      <RadioInput
        label={"Perte d'intérêt pour les activités professionnelles ou de détente - ou bien décrite directement par le malade, ou indirectement par son apathie, son indécision et ses hésitations (il a l'impression qu'il doit se forcer pour travailler ou pour avoir une activité quelconque)."}
        name="vItem7" id="vItem7.2" value="2"/>
      <RadioInput
        label={"Diminution du temps d'activité ou diminution de la productivité. A l'hôpital : cocher si le malade ne passe pas au moins 3 heures par jour à des activités - aides aux infirmières ou thérapie occupationnelle (à l'exclusion des tâches de routine de la salle)."}
        name="vItem7" id="vItem7.3" value="3"/>
      <RadioInput
        label={"A arrêté son travail en raison de sa maladie actuelle. A l'hôpital, cocher si le malade n'a aucune autre activité que les tâches de routine de salle, ou s'il est incapable d'exécuter ces tâches de routine sans être aidé."}
        name="vItem7" id="vItem7.4" value="4"/>
      <h1>Ralentissement</h1>
      <RadioInput label={"Langage et pensée normaux."} name="vItem8" id="vItem8.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Léger ralentissement à l'entretien."} name="vItem8" id="vItem8.1" value="1"/>
      <RadioInput label={"Ralentissement manifeste à l'entretien."} name="vItem8" id="vItem8.2" value="2"/>
      <RadioInput label={"Entretien difficile."} name="vItem8" id="vItem8.3" value="3"/>
      <RadioInput label={"Stupeur."} name="vItem8" id="vItem8.4" value="4"/>
      <h1> Agitation</h1>
      <RadioInput label={"Aucune."} name="vItem9" id="vItem9.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Crispations, secousses musculaires."} name="vItem9" id="vItem9.1" value="1"/>
      <RadioInput label={"Joue avec ses mains, ses cheveux, etc."} name="vItem9" id="vItem9.2" value="2"/>
      <RadioInput label={"Bouge, ne peut rester assis tranquille."} name="vItem9" id="vItem9.3" value="3"/>
      <RadioInput label={"Se tord les mains, ronge ses ongles, arrache ses cheveux, se mord les lèvres."} name="vItem9"
                  id="vItem9.4" value="4"/>
      <h1> Anxiété psychique</h1>
      <RadioInput label={"Aucun trouble."} name="vItem10" id="vItem10.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Tension subjective et irritabilité."} name="vItem10" id="vItem10.1" value="1"/>
      <RadioInput label={"Se fait du souci à propos de problèmes mineurs."} name="vItem10" id="vItem10.2" value="2"/>
      <RadioInput label={"Attitude inquiète, apparente dans l'expression faciale et le langage."} name="vItem10"
                  id="vItem10.3" value="3"/>
      <RadioInput label={"Peurs exprimées sans qu'on pose de questions."} name="vItem10" id="vItem10.4" value="4"/>
      <h1> Anxiété somatique</h1>
      <RadioInput label={"Absente."} name="vItem11" id="vItem11.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Discrète."} name="vItem11" id="vItem11.1" value="1"/>
      <RadioInput label={"Moyenne."} name="vItem11" id="vItem11.2" value="2"/>
      <RadioInput label={"Grave."} name="vItem11" id="vItem11.3" value="3"/>
      <RadioInput label={"Frappant le sujet d'incapacité fonctionnelle."} name="vItem11" id="vItem11.4" value="4"/>
      <h1>Symptômes somatiques gastro-intestinaux</h1>
      <RadioInput label={"Aucun."} name="vItem12" id="vItem12.0" value="0" defaultChecked="checked"/>
      <RadioInput
        label={"Perte d'appétit, mais mange sans y être poussé par les infirmières. Sentiment de lourdeur abdominale."}
        name="vItem12" id="vItem12.1" value="1"/>
      <RadioInput
        label={"A des difficultés à manger en l'absence d'incitations du personnel. Demande ou a besoin de laxatifs, de médicaments intestinaux ou gastriques."}
        name="vItem12" id="vItem12.2" value="2"/>
      <h1>Symptômes somatiques généraux</h1>
      <RadioInput label={"Aucun."} name="vItem13" id="vItem13.0" value="0" defaultChecked="checked"/>
      <RadioInput
        label={"Lourdeur dans les membres, dans le dos ou la tête. Douleurs dans le dos, céphalées, douleurs musculaires. Perte d'énergie et fatigabilité."}
        name="vItem13" id="vItem13.1" value="1"/>
      <RadioInput label={"Cocher dans le cas où n'importe quel symptôme est net."} name="vItem13" id="vItem13.2"
                  value="2"/>
      <h1>Symptômes génitaux</h1>
      <RadioInput label={"Absents."} name="vItem14" id="vItem14.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Légers."} name="vItem14" id="vItem14.1" value="1"/>
      <RadioInput label={"Graves."} name="vItem14" id="vItem14.2" value="2"/>
      <h1>Hypocondrie</h1>
      <RadioInput label={"Absente."} name="vItem15" id="vItem15.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Attention concentrée sur son propre corps."} name="vItem15" id="vItem15.1" value="1"/>
      <RadioInput label={"Préoccupations sur sa santé."} name="vItem15" id="vItem15.2" value="2"/>
      <RadioInput label={"Plaintes fréquentes, demandes d'aide, etc."} name="vItem15" id="vItem15.3" value="3"/>
      <RadioInput label={"Idées délirantes hypochondriques."} name="vItem15" id="vItem15.4" value="4"/>
      <h1>Perte de poids : (coter soit A, soit B)</h1>
      <h2>A : D'après les dires du malade</h2>
      <RadioInput label={"Pas de perte de poids."} name="vItem16" id="vItem16.0" value="0" defaultChecked="checked"/>
      <RadioInput label={"Perte de poids probable liée à la maladie actuelle."} name="vItem16" id="vItem16.1"
                  value="1"/>
      <RadioInput label={"Perte de poids certaine (suivant ce que dit le sujet)."} name="vItem16" id="vItem16.2"
                  value="2"/>
      <h2>B : Appréciation par pesées hebdomadaires par le personnel soignant lorsque des modifications actuelles de
        poids
        sont évaluées</h2>
      <RadioInput label={"- Moins de 500 g de perte de poids par semaine."} name="vItem16" id="vItem16.0b" value="0"
                  defaultChecked="checked"/>
      <RadioInput label={"- Plus de 500 g de perte de poids par semaine."} name="vItem16" id="vItem16.1b" value="1"/>
      <RadioInput label={"- Plus de 1 Kg de perte de poids par semaine."} name="vItem16" id="vItem16.2b" value="2"/>
      <h1>Prise de conscience</h1>
      <RadioInput label={"Reconnaît qu'il est déprimé et malade."} name="vItem17" id="vItem17.0" value="0"
                  defaultChecked="checked"/>
      <RadioInput
        label={"Reconnaît qu'il est malade, mais l'attribue à la nourriture, au climat, au surmenage, à un virus, à un besoin de repos, etc."}
        name="vItem17" id="vItem17.1" value="1"/>
      <RadioInput label={"Nie qu'il est malade."} name="vItem17" id="vItem17.2" value="2"/>
        <button>submit</button>
    </Form>);
}


export default HamiltonForm;