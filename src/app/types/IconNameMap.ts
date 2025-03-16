import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AppleIcon from '@mui/icons-material/Apple';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CakeIcon from '@mui/icons-material/Cake';
import SpeedIcon from '@mui/icons-material/Speed';
import { ActivityType } from '../shared/Users';
import { SvgIconComponent } from '@mui/icons-material';

export type HabitItem = {
  key: ActivityType;
  label: string;
  Icon: SvgIconComponent;
  value: number;
  isCount?: boolean;
};

export const habitItems: HabitItem[] = [
  { key: "treino", label: "Treino",value: 10, Icon: FitnessCenterIcon },
  { key: "salada", label: "Salada",value: 5, Icon: RestaurantIcon },
  { key: "fruta", label: "Frutas",value: 5, Icon: AppleIcon, isCount: true },
  { key: "agua", label: "Água",value: 10, Icon: WaterDropIcon, isCount: true },
  { key: "x9", label: "X9",value: 5, Icon: SpeedIcon },
  { key: "alcool", label: "Álcool",value: -5, Icon: LocalBarIcon },
  { key: "besteira", label: "Besteira",value: -5, Icon: CakeIcon },
];