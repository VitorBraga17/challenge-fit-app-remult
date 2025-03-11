import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AppleIcon from '@mui/icons-material/Apple';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CakeIcon from '@mui/icons-material/Cake';
import SpeedIcon from '@mui/icons-material/Speed';
import { HabitItem } from './HabitItem';

// Habit item configuration
export const habitItems: HabitItem[] = [
  { key: 'treino', label: 'Treino', Icon: FitnessCenterIcon },
  { key: 'salada', label: 'Salada', Icon: RestaurantIcon },
  { key: 'fruta', label: 'Frutas', Icon: AppleIcon },
  { key: 'agua', label: 'Água', Icon: WaterDropIcon },
  { key: 'x9', label: 'X9', Icon: SpeedIcon },
  { key: 'alcool', label: 'Álcool', Icon: LocalBarIcon },
  { key: 'besteira', label: 'Besteira', Icon: CakeIcon },
];