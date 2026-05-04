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

function App() {
  const owl      = usePetState(owlDialogues,  { x: 40,  y: 60 });
  const wolf     = usePetState(wolfDialogues, { x: 360, y: 60 });
  const schedule = useSchedule();
  const log      = useDailyLog();

  const wolfDialogue = schedule.nextEvent
    ? `Next: "${schedule.nextEvent.title}" in ${schedule.nextEvent.minutesUntil}m`
    : wolf.dialogue;

  return (
    <div className="stage">

      {/* Owl */}
      <Pet name="Owl" mood={owl.mood} dialogue={owl.dialogue}
        position={owl.position} onDrag={owl.handleDrag}
        onClick={owl.handleClick} accentColor="#A99EE0">
        <Owl mood={owl.mood} />
      </Pet>

      {/* Owl log panel */}
      <div className="owl-log-anchor"
        style={{ left: owl.position.x - 10, top: owl.position.y + 165 }}>
        <DailyLogPanel today={log.today} onReflection={log.addReflection} />
      </div>

      {/* Wolf */}
      <Pet name="Wolf" mood={wolf.mood} dialogue={wolfDialogue}
        position={wolf.position} onDrag={wolf.handleDrag}
        onClick={wolf.handleClick} accentColor="#C07820">
        <Wolf mood={wolf.mood} />
      </Pet>

      {/* Wolf schedule panel */}
      <div className="wolf-panel-anchor"
        style={{ left: wolf.position.x - 20, top: wolf.position.y + 165 }}>
        <WolfSchedule
          nextEvent={schedule.nextEvent}
          topReminders={schedule.topReminders}
          permissionStatus={schedule.permissionStatus}
        />
      </div>

      {/* Owl idle / pre-event overlay */}
      <OwlPrompt />

    </div>
  );
}

export default App;
