import { useTranslations } from '../../i18';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'preact/hooks';

function CircularProgress({
  progress,
  pending,
}: {
  progress: number;
  pending?: boolean;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const [progressUnavailable, setProgressUnavailable] = useState(false);

  useEffect(() => {
    if (progress === 0) {
      const timeout = setTimeout(() => {
        setProgressUnavailable(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (progressUnavailable) {
    return (
      <div className="flex justify-center">
        <div
          className={
            pending
              ? `border-success h-22 w-22 animate-spin rounded-full border-10 border-t-transparent`
              : `border-success h-22 w-22 rounded-full border-10`
          }
        ></div>
      </div>
    );
  }

  return (
    <svg className="mx-auto h-24 w-24 rotate-[-90deg]" width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        className="text-gray-200"
        strokeWidth="10"
        stroke="currentColor"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="stroke-success transition-[stroke-dashoffset] duration-500"
      />
    </svg>
  );
}

function Failed() {
  const { t } = useTranslations();

  return (
    <div className="my-16 text-center">
      <div className="relative mx-auto h-12 w-12">
        <XMarkIcon className="text-danger" />
      </div>
      <h2 className="text-2xl">{t('importer.loader.failed')}</h2>
    </div>
  );
}

function SuccessIcon() {
  return (
    <CheckIcon className="text-success absolute inset-0 m-auto h-12 w-12 stroke-4" />
  );
}

function Uploading({
  progress,
  pending,
}: {
  progress: number;
  pending?: boolean;
}) {
  const { t } = useTranslations();

  return (
    <div className="my-16 text-center">
      <div className="relative mx-auto h-24 w-24">
        <CircularProgress progress={progress} pending={pending} />
        {!pending && <SuccessIcon />}
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <b className="text-lg">{progress}%</b>
          </div>
        )}
      </div>
      {pending && (
        <h2 className="text-2xl">{t('importer.loader.uploading')}</h2>
      )}
      {!pending && <h2 className="text-2xl">{t('importer.loader.success')}</h2>}
    </div>
  );
}

interface Props {
  progress: number;
  pending?: boolean;
  failed?: boolean;
}

export default function Completed({ progress, pending, failed }: Props) {
  if (failed) {
    return <Failed />;
  }
  return <Uploading progress={progress} pending={pending} />;
}
