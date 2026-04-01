/**
 * Web mock for react-native-vector-icons/Feather
 * Uses lucide-react (already installed) which has the same icon names.
 */
import React from 'react';
import {
  Activity, Camera, Cloud, TrendingUp, MessageCircle,
  ArrowLeft, Sun, Droplet, MapPin, User, Send, Plus, Minus,
  X, Search, ChevronRight, ChevronDown, ChevronUp, Menu,
  Eye, EyeOff, Lock, Mail, Phone, Calendar, Bell,
  CheckCircle, AlertCircle, Info, HelpCircle, Settings,
  Upload, Download, Image, Zap, Leaf, RefreshCw,
  Home, FileText, BarChart2, Globe, Star, ThumbsUp,
  Thermometer, Wind, Umbrella, Edit, Trash2, Share2,
} from 'lucide-react';

// Map kebab-case Feather names → lucide-react components
const iconMap: Record<string, React.ComponentType<any>> = {
  'activity': Activity,
  'camera': Camera,
  'cloud': Cloud,
  'trending-up': TrendingUp,
  'message-circle': MessageCircle,
  'arrow-left': ArrowLeft,
  'sun': Sun,
  'droplet': Droplet,
  'map-pin': MapPin,
  'user': User,
  'send': Send,
  'plus': Plus,
  'minus': Minus,
  'x': X,
  'search': Search,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'menu': Menu,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'mail': Mail,
  'phone': Phone,
  'calendar': Calendar,
  'bell': Bell,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  'info': Info,
  'help-circle': HelpCircle,
  'settings': Settings,
  'upload': Upload,
  'download': Download,
  'image': Image,
  'zap': Zap,
  'leaf': Leaf,
  'refresh-cw': RefreshCw,
  'home': Home,
  'file-text': FileText,
  'bar-chart-2': BarChart2,
  'globe': Globe,
  'star': Star,
  'thumbs-up': ThumbsUp,
  'thermometer': Thermometer,
  'wind': Wind,
  'umbrella': Umbrella,
  'edit': Edit,
  'trash-2': Trash2,
  'share-2': Share2,
};

interface FeatherProps {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Feather: React.FC<FeatherProps> = ({ name, size = 24, color = '#000', style }) => {
  const Icon = iconMap[name];
  if (!Icon) {
    // Fallback: render a small dot for unmapped icons
    return <span style={{ display: 'inline-block', width: size, height: size, background: color, borderRadius: '50%', opacity: 0.4 }} />;
  }
  return <Icon size={size} color={color} style={style} />;
};

export default Feather;
