import React from "react";
import "../styles/blogLiteratureKarla.css";
import literatureImg from "../images/literatureKarla.png";
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';
import Barra from "../../components/Barra";
import { useNavigate } from "react-router-dom";

const BlogLiterature = () => {

const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/literature");
  };

  return (
    <>
      <Barra />
      <main>
        <section className="literature-container">
          <div className="maestro-izquierda">
            <div className="literature-title">
              <h1>Carla Olivares Rueda</h1>
              <h2>
                Mama esposa emprendedora y <span>Sobreviviente</span>
              </h2>
              
              <p className="literature-description">
                Soy originaria de la Ciudad de México y actualmente resido en
                Canadá. Me gradué como Licenciada en Psicología Organizacional
                del ITESM CEM y trabajé durante 13 años en México en el área de
                Recursos Humanos para diversas empresas nacionales e
                internacionales, como SIEMENS, General Mills y GIDEAS. Mi
                trayectoria profesional en México se centró principalmente en el
                desarrollo de áreas de Recursos Humanos, especialmente en
                compañías que iniciaban sus operaciones en el país, lo que me
                permitió profundizar en las diversas facetas de la gestión
                empresarial. <br />
                </p>
                <p>
                Hace nueve años me mudé a Canadá, una experiencia
                que me ha enseñado el valor de empezar desde cero y la
                importancia de abrirse a nuevas oportunidades, así como a
                valorar aún más mis raíces. En Canadá, he vivido momentos
                maravillosos, como el nacimiento de mis hijos, quienes crecen
                rodeados de la naturaleza y amabilidad de este país. Sin
                embargo, también enfrenté uno de los retos más difíciles de mi
                vida. <br /> 
                </p>
                <p>
                El 21 de julio de 2021, mi vida cambió radicalmente. Tras
                años de síntomas inexplicables y diagnósticos erróneos, sufrí un
                síncope debido a un ataque al corazón, lo que culminó con la
                colocación de un marcapasos el 5 de agosto del mismo año. Este
                proceso fue doloroso e incierto. Durante años, busqué respuestas
                a mi fatiga crónica y síntomas debilitantes. A pesar de mi
                dedicación al ejercicio, la buena alimentación y un estilo de
                vida saludable, mi cuerpo se iba apagando poco a poco. <br />
                </p> 
                <p>
                Todo
                comenzó durante mi segundo embarazo, cuando un ginecólogo
                detectó que mis pulsaciones eran inusualmente bajas. Después del
                parto, me sometí a pruebas tales como el holter , y el
                Diagnóstico del doctor fue que solo era una “Mamá estresada”pero
                mi intuición me decía que era algo más. Finalmente, un
                cardiólogo en México a través de una prueba por FaceTime
                confirmó lo que temía: mi corazón estaba fallando y era solo
                cuestión de tiempo antes de que se apagara completamente.
                Gracias al apoyo y amor incondicional de mi familia, logré
                recibir la atención que necesitaba. <br />
                </p>
                <p>
                Hoy, con un marcapasos y una
                nueva perspectiva de vida, abrazo esta segunda oportunidad con
                gratitud y propósito. Mi experiencia me ha motivado a crear
                conciencia sobre la disautonomía y las enfermedades
                cardiovasculares en mujeres, y a apoyar a otras que atraviesan
                situaciones similares, especialmente en el extranjero. A través
                de mi emprendimiento “Cacao.Cocoa with Cause”, promuevo el
                equilibrio de vida y hago un llamado a la prevención y cuidado
                del corazón, la principal causa de muerte en mujeres a nivel
                mundial. <br />
                </p>  
                <p>
                Mi madre siempre me dijo: “Si estás pasando por un
                momento difícil, permítete doblarte, pero nunca te quiebres.”
                Hoy, con esa lección en el corazón, sigo adelante, ayudando a
                otras mujeres a escuchar su voz interior y a no rendirse ante la
                adversidad.
                </p>
            </div>
          </div>
          <div className="maestro-derecha">
            <img src={literatureImg} alt="" />
          </div>
        </section>
        <div className='contact-literature-questions'>
            <button onClick={handleRedirect}>Ponerme en contacto</button>
            <div className='literature-socials'>
              <div><img src={instagram} alt='WhatsApp' /></div>
              <div><img src={face} alt='Facebook' /></div>
              <div><img src={whats} alt='Instagram' /></div>
            </div>
        </div>
      </main>
    </>
  );
};

export default BlogLiterature;
