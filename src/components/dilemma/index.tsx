import style from "./index.module.scss";

export default function Dilemma() {
  return (
    <p className={style.text}>
      Vous êtes la cible d'une expérience, vous entrez dans une salle avec
      seulement un bouton. À chaque fois que vous appuyez dessus, vous empochez
      5000 euros MAIS vous oubliez totalement l'existence d'une personne à qui
      vous avez déjà parlé. (ex : ça peut être votre mère, comme votre
      boulangère ou un élève de primaire, c'est totalement au hasard.) Combien
      de fois vous seriez capable d'appuyer avant de sortir ?
    </p>
  );
}
