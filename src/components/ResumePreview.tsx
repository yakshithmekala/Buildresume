import React from 'react';
import { ResumeData, ResumeTheme } from '../types/resume';
import { ExecutiveATSTemplate } from './templates/ExecutiveATSTemplate';
import { ModernDualColumnTemplate } from './templates/ModernDualColumnTemplate';
import { TechGlassTemplate } from './templates/TechGlassTemplate';
import { CompactOnePageTemplate } from './templates/CompactOnePageTemplate';
import { EmeraldTemplate } from './templates/EmeraldTemplate';
import { IndigoTemplate } from './templates/IndigoTemplate';
import { NordicTemplate } from './templates/NordicTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, theme }) => {
  switch (theme) {
    case 'executive':
      return <ExecutiveATSTemplate data={data} />;
    case 'modern':
      return <ModernDualColumnTemplate data={data} />;
    case 'glass':
      return <TechGlassTemplate data={data} />;
    case 'compact':
      return <CompactOnePageTemplate data={data} />;
    case 'emerald':
      return <EmeraldTemplate data={data} />;
    case 'indigo':
      return <IndigoTemplate data={data} />;
    case 'nordic':
      return <NordicTemplate data={data} />;
    default:
      return <ExecutiveATSTemplate data={data} />;
  }
};
