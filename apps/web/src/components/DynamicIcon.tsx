/**
 * DynamicIcon - Maps Lucide icon names from Sanity to React components
 *
 * This component allows rendering any Lucide icon by name string,
 * enabling dynamic icon selection from Sanity CMS.
 */

import React from 'react';
import {
  // General
  Code2,
  Sparkles,
  Layout,
  Container,
  Lightbulb,
  Search,
  Rocket,
  Cpu,
  FlaskConical,
  Star,
  Check,
  CheckCircle,
  X,
  Plus,
  Minus,
  // Navigation
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  // Communication
  MessageCircle,
  Mail,
  Phone,
  Send,
  // ChatBubble removed - using MessageCircle instead
  // Users
  User,
  Users,
  UserCircle,
  UserPlus,
  // Media
  Image,
  Video,
  Camera,
  Play,
  Pause,
  // Files
  File,
  FileText,
  Folder,
  Download,
  Upload,
  // Settings
  Settings,
  Sliders,
  ToggleRight,
  // Tool removed - using Wrench instead
  Wrench,
  // Business
  Briefcase,
  Building,
  Building2,
  Globe,
  Map,
  MapPin,
  // Tech/Dev
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  Database,
  Server,
  Cloud,
  HardDrive,
  Wifi,
  Shield,
  Lock,
  Key,
  Fingerprint,
  // Analytics
  ChartBar,
  ChartLine,
  ChartPie,
  Activity,
  TrendingUp,
  TrendingDown,
  // Alerts
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  // BellRing removed - using Bell instead
  // Misc
  Heart,
  ThumbsUp,
  Award,
  Badge,
  Calendar,
  Clock,
  Timer,
  Zap,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Link,
  ExternalLink,
  Bookmark,
  Tag,
  Layers,
  Grid,
  Menu,
  MoreHorizontal,
  MoreVertical,
} from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

// Map of icon names to Lucide components
// Note: Some icons from iconList.ts may have different names in lucide-react
const iconMap: Record<string, LucideIcon> = {
  // General
  Code2,
  Sparkles,
  Layout,
  Container,
  Lightbulb,
  Search,
  Rocket,
  Cpu,
  FlaskConical,
  Star,
  Check,
  CheckCircle,
  X,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  // Communication
  MessageCircle,
  Mail,
  Phone,
  Send,
  ChatBubble: MessageCircle, // Alias - iconList uses ChatBubble but lucide has MessageCircle
  // Users
  User,
  Users,
  UserCircle,
  UserPlus,
  // Media
  Image,
  Video,
  Camera,
  Play,
  Pause,
  // Files
  File,
  FileText,
  Folder,
  Download,
  Upload,
  // Settings
  Settings,
  Sliders,
  ToggleRight,
  Tool: Wrench, // Alias - iconList uses Tool but lucide has Wrench
  Wrench,
  // Business
  Briefcase,
  Building,
  Building2,
  Globe,
  Map,
  MapPin,
  // Tech/Dev
  Terminal,
  GitBranch,
  GitCommit,
  GitMerge,
  Database,
  Server,
  Cloud,
  HardDrive,
  Wifi,
  Shield,
  Lock,
  Key,
  Fingerprint,
  // Analytics
  ChartBar,
  ChartLine,
  ChartPie,
  Activity,
  TrendingUp,
  TrendingDown,
  // Alerts
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  BellRing: Bell, // Alias
  // Misc
  Heart,
  ThumbsUp,
  Award,
  Badge,
  Calendar,
  Clock,
  Timer,
  Zap,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Link,
  ExternalLink,
  Bookmark,
  Tag,
  Layers,
  Grid,
  Menu,
  MoreHorizontal,
  MoreVertical,
};

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  /** Icon name from Sanity (e.g., 'Code2', 'Sparkles', 'Rocket') */
  name: string;
  /** Fallback icon if name not found (defaults to Code2) */
  fallback?: string;
}

/**
 * DynamicIcon component
 *
 * Renders a Lucide icon by name string, enabling dynamic icon selection
 * from Sanity CMS without hardcoding specific icons in components.
 *
 * @example
 * // Basic usage
 * <DynamicIcon name="Rocket" />
 *
 * @example
 * // With size and color
 * <DynamicIcon name="Sparkles" size={32} color="#8b5cf6" />
 *
 * @example
 * // With className for Tailwind styling
 * <DynamicIcon name="Code2" className="w-6 h-6 text-primary" />
 *
 * @example
 * // With custom fallback
 * <DynamicIcon name="UnknownIcon" fallback="Star" />
 */
export function DynamicIcon({
  name,
  fallback = 'Code2',
  className,
  size = 24,
  color,
  ...props
}: DynamicIconProps) {
  const IconComponent = iconMap[name] || iconMap[fallback];

  if (!IconComponent) {
    // Ultimate fallback if even the fallback icon doesn't exist
    return <Code2 className={className} size={size} color={color} {...props} />;
  }

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      {...props}
    />
  );
}

/**
 * Get icon component by name (for direct use without wrapper)
 *
 * @example
 * const RocketIcon = getIconComponent('Rocket');
 * <RocketIcon className="w-6 h-6" />
 */
export function getIconComponent(name: string): LucideIcon {
  return iconMap[name] || Code2;
}

/**
 * Check if an icon name is valid/exists in the map
 */
export function isValidIconName(name: string): boolean {
  return name in iconMap;
}

/**
 * Get all available icon names (for validation or debugging)
 */
export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap);
}

export default DynamicIcon;