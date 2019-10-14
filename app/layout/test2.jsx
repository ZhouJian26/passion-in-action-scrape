import Header from "../navbar/navbar";
/**
 * Esempio altro modo per creare e usare layout
 * in index2
 */
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const withLayout = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;
