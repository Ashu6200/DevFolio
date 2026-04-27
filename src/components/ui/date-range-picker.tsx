'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onSelect: (range: DateRange | undefined) => void;
  toDisabled?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  from,
  to,
  onSelect,
  toDisabled = false,
  placeholder = 'Select date range',
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(range: DateRange | undefined) {
    onSelect(range);
    if (range?.from && (range?.to || toDisabled)) {
      setOpen(false);
    }
  }

  function formatLabel() {
    if (!from) return placeholder;
    const fromStr = format(from, 'MMM yyyy');
    if (toDisabled) return `${fromStr} – Present`;
    if (!to) return fromStr;
    return `${fromStr} – ${format(to, 'MMM yyyy')}`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4 shrink-0' />
          {formatLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          selected={{ from, to: toDisabled ? undefined : to }}
          onSelect={handleSelect}
          numberOfMonths={1}
          captionLayout='dropdown'
          fromYear={1950}
          toYear={new Date().getFullYear() + 5}
        />
      </PopoverContent>
    </Popover>
  );
}
