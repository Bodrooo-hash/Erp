import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Banknote,
  ShoppingCart,
  Warehouse,
  BarChart3,
  FileText,
  Users,
  Scale,
} from "lucide-react";

interface ProcessItem {
  id: number;
  name: string;
}

interface Section {
  key: string;
  roman: string;
  title: string;
  abbr?: string;
  icon: React.ReactNode;
  color: string;
  items: ProcessItem[];
}

const sections: Section[] = [
  {
    key: "ops",
    roman: "I",
    title: "Операционные финансы",
    icon: <Banknote className="w-4 h-4" />,
    color: "#3b82f6",
    items: [
      { id: 46, name: "Исходящие платежи" },
      { id: 52, name: "Входящие платежи" },
    ],
  },
  {
    key: "ur",
    roman: "II",
    title: "Реализация и дистрибьюция",
    abbr: "UR",
    icon: <ShoppingCart className="w-4 h-4" />,
    color: "#8b5cf6",
    items: [
      { id: 68, name: "Маркетплейсы: Сверка взаиморасчетов" },
      { id: 70, name: "B2B: Сверка с контрагентами" },
      { id: 72, name: "Розничные продажи: Сверка эквайринга, ККД" },
      { id: 74, name: "Розничные продажи: Обработка возвратов" },
      { id: 76, name: "Тендеры, гос. и корп. закупки" },
    ],
  },
  {
    key: "warehouse",
    roman: "III",
    title: "Склад и ТМЦ",
    icon: <Warehouse className="w-4 h-4" />,
    color: "#10b981",
    items: [
      { id: 60, name: "Оприходование товара" },
      { id: 62, name: "Инвентаризация" },
      { id: 64, name: "Списание / Брак" },
    ],
  },
  {
    key: "mgmt",
    roman: "IV",
    title: "Управленческий учет и планирование",
    icon: <BarChart3 className="w-4 h-4" />,
    color: "#f59e0b",
    items: [
      { id: 48, name: "Фин. планирование и unit-экономика" },
      { id: 66, name: "Формирование управленческих отчетов" },
    ],
  },
  {
    key: "tax",
    roman: "V",
    title: "Налоговая отчетность и гос.органы",
    abbr: "NR",
    icon: <FileText className="w-4 h-4" />,
    color: "#ef4444",
    items: [
      { id: 44, name: "Налоги и отчеты в ФНС" },
      { id: 54, name: "Запросы гос.органов" },
    ],
  },
  {
    key: "hr",
    roman: "VI",
    title: "Расчеты с персоналом",
    abbr: "ZK",
    icon: <Users className="w-4 h-4" />,
    color: "#ec4899",
    items: [
      { id: 50, name: "Начисление ЗП" },
      { id: 56, name: "Кадровые движения" },
      { id: 58, name: "Командировочные" },
    ],
  },
  {
    key: "legal",
    roman: "VII",
    title: "Документы, контракты и юр. поле",
    icon: <Scale className="w-4 h-4" />,
    color: "#6366f1",
    items: [],
  },
];

function SectionBranch({ section }: { section: Section }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="relative">
      {/* Branch connector - vertical line from parent */}
      <div
        className="absolute left-0 top-0 w-px h-full"
        style={{ backgroundColor: `${section.color}20` }}
      />

      {/* Section header */}
      <div className="relative flex items-start gap-2 group">
        {/* Horizontal connector dot */}
        <div
          className="relative z-10 mt-[2px] flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
          style={{ backgroundColor: `${section.color}15`, color: section.color }}
        >
          {section.icon}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 min-w-0 text-left hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span
            className="flex-shrink-0 text-[11px] px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${section.color}12`,
              color: section.color,
            }}
          >
            {section.roman}
          </span>
          <span className="text-[13px] text-foreground truncate">
            {section.title}
          </span>
          {section.abbr && (
            <span
              className="flex-shrink-0 text-[10px] px-1 py-0.5 rounded"
              style={{
                backgroundColor: `${section.color}10`,
                color: section.color,
              }}
            >
              {section.abbr}
            </span>
          )}
          {section.items.length > 0 && (
            <span className="flex-shrink-0 text-muted-foreground">
              {expanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </button>
      </div>

      {/* Items */}
      {expanded && section.items.length > 0 && (
        <div className="ml-3 mt-1 mb-1 pl-5 border-l border-dashed" style={{ borderColor: `${section.color}30` }}>
          {section.items.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex items-center gap-2 py-[3px] group/item"
            >
              {/* Horizontal dash */}
              <div
                className="absolute -left-5 top-1/2 w-4 h-px"
                style={{ backgroundColor: `${section.color}30` }}
              />
              {/* Dot */}
              <div
                className="relative z-10 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: `${section.color}50` }}
              />
              <span className="text-[11px] text-muted-foreground flex-shrink-0 tabular-nums w-5 text-right">
                {item.id}
              </span>
              <span className="text-[12px] text-foreground/80 group-hover/item:text-foreground transition-colors truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Empty section note */}
      {expanded && section.items.length === 0 && (
        <div className="ml-3 pl-5 mt-1 mb-1">
          <span className="text-[11px] text-muted-foreground italic">
            Нет процессов
          </span>
        </div>
      )}
    </div>
  );
}

export function FinanceTree() {
  const totalProcesses = sections.reduce(
    (acc, s) => acc + s.items.length,
    0
  );

  return (
    <div className="w-full max-w-md bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="text-[14px] text-foreground">Финансовый отдел</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              {sections.length} разделов
            </span>
            <span className="text-[10px] text-muted-foreground/50">•</span>
            <span className="text-[11px] text-muted-foreground">
              {totalProcesses} процессов
            </span>
          </div>
        </div>
      </div>

      {/* Tree body */}
      <div className="px-4 py-3 space-y-2.5">
        {sections.map((section) => (
          <SectionBranch key={section.key} section={section} />
        ))}
      </div>
    </div>
  );
}
