import Form2 from "./components/form2";
import Header from "./components/header";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Header />
        <Form2 />
      </div>
    </DndProvider>
  );
}
