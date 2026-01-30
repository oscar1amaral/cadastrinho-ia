import React, { useState, useCallback } from 'react';
import { FilePreview } from '../types';

interface DropzoneProps {
  files: FilePreview[];
  setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
  onNotify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ files, setFiles, onNotify }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((incomingFiles: File[]) => {
    const validFiles = incomingFiles.filter(file => {
      const isValid = file.type === 'application/pdf' || file.type.startsWith('image/');
      if (!isValid) {
        onNotify(`Arquivo ${file.name} ignorado. Apenas imagens e PDFs.`, 'error');
      }
      return isValid;
    });

    const newFiles: FilePreview[] = validFiles.map(file => ({
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      type: file.type === 'application/pdf' ? 'pdf' : 'image'
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, [setFiles, onNotify]);

  const removeFile = (index: number) => {
    setFiles(prev => {
      const updated = [...prev];
      if (updated[index].previewUrl) URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(Array.from(e.dataTransfer.files)); }}
        onClick={() => document.getElementById('fileInput')?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-10 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group overflow-hidden
          ${isDragging 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/[0.08]'}`}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          accept="image/*,application/pdf"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />
        
        {/* Animated background circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
        
        <div className="relative z-10 w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        
        <h3 className="relative z-10 text-xl font-medium text-white group-hover:text-primary transition-colors">Arraste sua arte aqui</h3>
        <p className="relative z-10 text-sm text-lavender-200/40 mt-2">Clique para selecionar imagens ou PDFs</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {files.map((fp, idx) => (
            <div key={idx} className="relative group aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-xl p-2 transition-all hover:scale-105">
              {fp.type === 'image' ? (
                <img src={fp.previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-inner" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Documento PDF</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="text-[10px] text-white font-medium truncate mb-8 absolute top-4 left-4 right-4">{fp.file.name}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                  className="bg-red-500/80 hover:bg-red-500 text-white rounded-full p-3 transform transition-transform hover:scale-110 shadow-lg"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropzone;