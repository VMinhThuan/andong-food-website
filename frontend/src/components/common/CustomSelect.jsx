import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ value, onChange, options, placeholder = 'Chọn chủ đề...', style = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format options
  const formattedOptions = options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = formattedOptions.find(opt => opt.value === value);

  return (
    <div ref={selectRef} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '50px',
          padding: '0 14px',
          borderRadius: '12px',
          border: isOpen ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)',
          fontSize: '0.9rem',
          color: selectedOption ? 'var(--primary)' : 'var(--text-light)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(17, 156, 74, 0.08)' : 'none',
          transition: 'all 0.2s ease',
          textAlign: 'left'
        }}
      >
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginRight: '8px'
        }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: '#526058' }}
        >
          <ChevronDown size={17} />
        </m.div>
      </button>

      {/* Animated Dropdown Menu Panel (Rộng rãi, không bị rớt dòng, không scrollbar thô) */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              minWidth: '100%',
              width: 'max-content',
              maxWidth: '360px',
              zIndex: 1200,
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 16px 36px rgba(17, 156, 74, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)',
              padding: '6px',
              overflow: 'hidden'
            }}
          >
            {formattedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? '700' : '500',
                    color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                    backgroundColor: isSelected ? 'rgba(17, 156, 74, 0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                    marginBottom: '2px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#f7f5ed';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <Check size={15} color="var(--primary)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
