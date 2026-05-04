import Pet from './components/Pet';
import Owl from './components/Owl';
import Wolf from './components/Wolf';
import WolfSchedule from './components/WolfSchedule';
import OwlPrompt from './components/OwlPrompt';
import DailyLogPanel from './components/DailyLogPanel';
import { usePetState } from './hooks/usePetState';
import { useSchedule } from './hooks/useSchedule';
import { useDailyLog } from './hooks/useDailyLog';
import owlDialogues  from './data/dialogue/owl.json';
import wolfDialogues from './data/dialogue/wolf.json';
import './styles/app.css';

// Left-side layout constants
const WOLF_X = 4;
const WOLF_Y = 8;
const OWL_X  = 4;
const OWL_Y  = 240;

function App() {
  const wolf     = usePetState(wolfDialogues, { x: WOLF_X, y: WOLF_Y });
  const owl      = usePetState(owlDialogues,  { x: OWL_X,  y: OWL_Y  });
  const schedule = useSchedule();
  const log      = useDailyLog();

  const wolfDialogue = schedule.nextEvent
    ? `Next: "${schedule.nextEvent.title}" — ${schedule.nextEvent.minutesUntil}m`
    : wolf.dialogue;

  return (
    <div className="stage">

      {/* Wolf — top, schedule assistant */}
      <Pet name="Wolf" mood={wolf.mood} dialogue={wolfDialogue}
        position={wolf.position} onDrag={wolf.handleDrag}
        onClick={wolf.handleClick} accentColor="#C07820" scale={0.55}>
        <Wolf mood={wolf.mood} />
      </Pet>

      {/* Wolf schedule panel */}
      <div className="wolf-panel-anchor"
        style={{ left: wolf.position.x, top: wolf.position.y + 90 }}>
        <WolfSchedule
          nextEvent={schedule.nextEvent}
          allEvents={schedule.allEvents}
          permissionStatus={schedule.permissionStatus}
        />
      </div>

      {/* Owl — below Wolf, reflection companion */}
      <Pet name="Owl" mood={owl.mood} dialogue={owl.dialogue}
        position={owl.position} onDrag={owl.handleDrag}
        onClick={owl.handleClick} accentColor="#A99EE0" scale={0.55}>
        <Owl mood={owl.mood} />
      </Pet>

      {/* Owl log panel */}
      <div className="owl-log-anchor"
        style={{ left: owl.position.x, top: owl.position.y + 90 }}>
        <DailyLogPanel today={log.today} onReflection={log.addReflection} />
      </div>

      {/* Owl idle / pre-event overlay */}
      <OwlPrompt />

    </div>
  );
}

export default App;
