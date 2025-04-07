import { NgModule } from '@angular/core';
import {
  ChevronRight,
  ChevronsLeftRight,
  ChevronDown,
  LucideAngularModule,
  AlignJustify,
  Calendar,
  User,
  CalendarClock,
  CalendarCheck2,
  Shield,
  MapPin,
  Mail,
  Banknote,
  BadgeDollarSign,
  QrCode,
  ArrowBigRight,
  BadgeCheck,
  Trophy,
  ChevronUp,
  Globe,
  DoorOpen,
  Wallet,
  Ticket,
  Camera,
  Gift,
  DollarSign,
  CreditCard,
  Users,
  Info,
  LayoutDashboard,
  Image,
  Search,
  Check,
  UserCog,
  Scan,
  Pencil,
  Phone,
  IdCard,
  Building,
  EllipsisVertical,
  Lock,
  Bell,
  CircleHelp,
  FileText,
  Trash2,
  ShoppingCart,
  Building2,
  Plus,
  TicketX,
  CircleCheck,
  CircleX,
  Tickets,
  CirclePlus,
  Crown,
  Eye,
  CalendarDays,
  Clock,
  Hash,
  EyeOff,
  AlarmClock,
  AlarmClockOff,
  Coins,
  ArrowRightLeft,
  CircleUserRound,
  Dot,
  CalendarRange,
  Menu,
  CircleDot,
  Settings,
  LogOut,
  CalendarCog,
  UserRoundPen,
  ReceiptText,
  ScanQrCode,
  ArrowLeftRight,
  ArrowLeft,
  ShieldCheck,
  ShieldMinus,
  TriangleAlert,
  FilePenLine,
  DoorClosed,
  HandCoins,
  Share2,
  Copy,
  Instagram,
  Ban,
  TicketCheck,
  Minus,
  Equal,
  X,
  CirclePercent,
  Receipt,
  TicketPercent,
  CalendarX,
  CalendarCheck,
  TvMinimal,
  UserPlus,
  CheckCircle,
  Speaker,
  Star,
  ChartNoAxesColumnIncreasing,
  FileImage,
  Clipboard,
  ExternalLink,
  FileUp,
  Upload,
  FileType,
  Trash,
  Wifi,
  Zap,
  Smartphone,
  RefreshCw,
  XCircle,
  HelpCircle,
  Edit,
  Linkedin,
  Github,
  PenTool,
  BookOpen,
  Layout,
  ArrowRight,
  Lamp,
  Monitor,
  Film
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Instagram,
      Linkedin,
      Github,
      Mail,
      ChevronDown,
      PenTool,
      Image,
      BookOpen,
      Layout,
      MapPin,
      Menu,
      ArrowRight,
      Lamp,
      Monitor,
      Pencil,
      Film
    })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class LucideModule { } 