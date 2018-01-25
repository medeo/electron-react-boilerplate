import React from 'react';
import { Form, CheckBoxInput } from '@medeo/form';

const MMSForm = ({onChange: onChangeProps}) => {
  const onChange = (inputs) => {
    const values = Object.values(inputs).map(value => Number.parseInt(value, 10));
    const result = values.reduce((sum, value) => sum + value, 0);

    return onChangeProps( result);
  };
  return (
    <Form onChange={onChange}>
      <span>Lisez le texte suivant au patient: Je vais vous poser quelques questions pour apprécier comment fonctionne votre mémoire. Les unes sont très simples, les autres un peu moins. Vous devez répondre du mieux que vous pouvezPar la suite, Les textes en italique en dehors des items à cocher sont à lire au patient. Cochez les bonnes réponses aux questions suivantes:</span>
      <h1> Orientation </h1>
      <span>Quelle est la date complète d'aujourd'hui ? (si complet, cochez toutes les cases, sinon décomposez les questions)</span>
      <CheckBoxInput name="vItem1" id="vItem1" value="1" label="En quelle année sommes-nous ?"/>
      <CheckBoxInput name="vItem2" id="vItem2" value="1" label="En quelle saison ?"/>
      <CheckBoxInput name="vItem3" id="vItem3" value="1" label="En quel mois ?"/>
      <CheckBoxInput name="vItem4" id="vItem4" value="1" label="Quel jour du mois ?"/>
      <CheckBoxInput name="vItem5" id="vItem5" value="1" label="Quel jour de la semaine ?"/>
      <span> Je vais vous poser maintenant quelques questions sur l'endroit où nous trouvons.</span>

      <CheckBoxInput name="vItem6" id="vItem6" value="1" label="Quel est le nom de l'hôpital où nous sommes ?"/>
      <CheckBoxInput name="vItem7" id="vItem7" value="1" label="Dans quelle ville se trouve-t-il ?"/>
      <CheckBoxInput name="vItem8" id="vItem8" value="1" label="Quel est le nom du département dans lequel est située cette ville ?"/>
      <CheckBoxInput name="vItem9" id="vItem9" value="1" label="Dans quelle province ou région est située ce département ?"/>
      <CheckBoxInput name="vItem10" id="vItem10" value="1" label="A quel étage sommes-nous ?"/>

      <h1>Apprentissage</h1>
      <span>Je vais vous dire trois mots ; je vous voudrais que vous me les répétiez et que vous
            essayiez de les retenir car je vous les redemanderai tout à l'heure. (trois versions de mots
            sont proposées, choisissez un seul des mots par ligne)</span>
      <CheckBoxInput name="vItem11" id="vItem11" value="1" label="Cigare ; Citron ; Fauteuil"/>
      <CheckBoxInput name="vItem12" id="vItem12" value="1" label="Fleur ; Clé ; Tulipe"/>
      <CheckBoxInput name="vItem13" id="vItem13" value="1" label="Porte ; Ballon ; Canard"/>

      <span>Répéter les 3 mots. (cochez maintenant une ligne par mot répété)</span>
      <h1>Attention et calcul</h1>

      <span> Voulez-vous compter à partir de 100 en retirant 7 à chaque fois ?</span>
      <CheckBoxInput name="vItem14" id="vItem14" value="1" label="93"/>
      <CheckBoxInput name="vItem15" id="vItem15" value="1" label="86"/>
      <CheckBoxInput name="vItem16" id="vItem16" value="1" label="79"/>
      <CheckBoxInput name="vItem17" id="vItem17" value="1" label="72"/>
      <CheckBoxInput name="vItem18" id="vItem18" value="1" label="65"/>

      <span>Si le patient est en difficulté, dites-lui : Voulez-vous épeler le mot MONDE à
        l'envers ? (un point par lettre)</span>
      <h1>Rappel</h1>
      <span>Pouvez-vous me dire quels étaient les 3 mots que je vous ai demandés de répéter et
            de retenir tout à l'heure ?</span>
      <CheckBoxInput name="vItem19" id="vItem19" value="1" label="Cigare ; Citron ; Fauteuil"/>
      <CheckBoxInput name="vItem20" id="vItem20" value="1" label="Fleur ; Clé ; Tulipe"/>
      <CheckBoxInput name="vItem21" id="vItem21" value="1" label="Porte ; Ballon ; Canard"/>

      <h1>Langage</h1>

      <CheckBoxInput name="vItem22" id="vItem22" value="1" label="Quel est le nom de cet objet ? (montrer un crayon)"/>
      <CheckBoxInput name="vItem23" id="vItem23" value="1" label="Quel est le nom de cet objet ? (montrer une montre)"/>
      <CheckBoxInput name="vItem24" id="vItem24" value="1" label="Ecoutez bien et répétez après moi : «&nbsp;<em>Pas de mais, ni de si, ni de et</em>&nbsp;»"/>

      <span>Poser une feuille de papier sur le bureau, la montrer au sujet en lui
            disant :  Ecoutez bien et faites ce que je vais vous dire </span>
      <CheckBoxInput name="vItem25" id="vItem25" value="1" label="Prenez cette feuille de papier avec votre main droite,"/>
      <CheckBoxInput name="vItem26" id="vItem26" value="1" label="Pliez-la en deux,"/>
      <CheckBoxInput name="vItem27" id="vItem27" value="1" label="Et jetez-la par terre."/>
      <span>
    Tendre au sujet une feuille de papier sur laquelle est écrit en gros caractère
    «&nbsp;FERMEZ LES YEUX&nbsp;» et dire au sujet :
    </span>
      <CheckBoxInput name="vItem28" id="vItem28" value="1" label="«&nbsp;Faites ce qui est écrit&nbsp;» (cocher si le sujet ferme les yeux)."/>

      <span>Tendre au sujet une feuille de papier et un stylo, en disant :</span>
      <CheckBoxInput name="vItem29" id="vItem29" value="1" label="«&nbsp;Voulez-vous m'écrire une phrase, ce que vous voulez, mais une phrase entière.&nbsp;»  (cocher si réussi)"/>

      <h1>Praxies constructives</h1>
      <span>Tendre au sujet une feuille de papier et lui demander, en lui montrant le dessin ci-après :</span>
      <CheckBoxInput name="vItem30" id="vItem30" value="1" label="«&nbsp;Voulez-vous recopier ce dessin ?&nbsp;» (cocher si réussi)"/>
      <img src="mms.gif" alt="" width={200} height={150}/>
      <button>submit</button>
    </Form>
  );
}




export default MMSForm;