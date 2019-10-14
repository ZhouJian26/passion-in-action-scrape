/**
 * Questo è un template ovvero dove posso assemblare una pagina web con i componenti
 * viene chiamata o meglio importata da una pagina in pages, in un certo senso fa da catalizzatore
 * tra la pagina da renderizzare e le altre componenti di quella pagina web, questo è utile nel caso
 * in cui il sito ha varie pagine in cui condividono degli elementi come per esempio la navbar il
 * footer ect..
 */
import Header from "../navbar/navbar";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};
/**
 *  {props.children} serve per passare roba da padre a figlio
 */
const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
