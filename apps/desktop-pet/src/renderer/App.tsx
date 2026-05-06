import Pet from './components/Pet';
import Owl from './components/Owl';
import Wolf from './components/Wolf';
import WolfSchedule from './components/WolfSchedule';
import PackmanPrompt from './components/PackmanPrompt';
import Packman from './components/Packman';
import { usePetState } from './hooks/usePetState';
import { useSchedule } from './hooks/useSchedule';
import owlDialogues  from './data/dialogue/owl.json';
import wolfDialogues from './data/dialogue/wolf.json';
import packmanDialogues from './data/dialogue/packman.json';
import './styles/app.css';

const WOLF_X = 4;
const WOLF_Y = 8;
const OWL_X  = 4;
const OWL_Y  = 240;
const PACKMAN_X = 4;
const PACKMAN_Y = 400;

function App() {
  const wolf     = usePetState(wolfDialogues, { x: WOLF_X, y: WOLF_Y });
  const owl      = usePetState(owlDialogues,  { x: OWL_X,  y: OWL_Y  });
  const packman  = usePetState(packmanDialogues, { x: PACKMAN_X, y: PACKMAN_Y });
  const schedule = useSchedule();

  const wolfDialogue = schedule.nextEvent
    ? `Next: "${schedule.nextEvent.title}" — ${schedule.nextEvent.minutesUntil}m`
    : wolf.dialogue;

  return (
    <div className="stage">

      {/* Wolf */}
      <Pet name="Wolf" mood={wolf.mood} dialogue={wolfDialogue}
        position={wolf.position} onDrag={wolf.handleDrag}
        onClick={wolf.handleClick} accentColor="#C07820" scale={0.55}>
        <Wolf mood={wolf.mood} />
      </Pet>

      <div className="wolf-panel-anchor"
        style={{ left: wolf.position.x, top: wolf.position.y + 90 }}>
        <WolfSchedule
          nextEvent={schedule.nextEvent}
          allEvents={schedule.allEvents}
          permissionStatus={schedule.permissionStatus}
        />
      </div>

      {/* Owl */}
      <Pet name="Owl" mood={owl.mood} dialogue={owl.dialogue}
        position={owl.position} onDrag={owl.handleDrag}
        onClick={owl.handleClick} accentColor="#A99EE0" scale={0.55}>
        <Owl mood={owl.mood} />
      </Pet>

      {/* Packman */}
      <Pet name="Packman" mood={packman.mood} dialogue={packman.dialogue}
        position={packman.position} onDrag={packman.handleDrag}
        onClick={packman.handleClick} accentColor="#FFD83D" scale={0.55}>
        <Packman mood={packman.mood} />
      </Pet>

      {/* Packman hourly pause overlay */}
      <PackmanPrompt />

    </div>
  );
}

export default App;
