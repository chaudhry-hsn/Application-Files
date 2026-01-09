
import React, { useState } from 'react';
import { ProjectInput, ProjectPackage, AppStatus } from './types';
import { generateProjectPackage } from './services/geminiService';
import ProjectForm from './components/ProjectForm';
import ProjectOutput from './components/ProjectOutput';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<ProjectPackage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: ProjectInput) => {
    try {
      setStatus(AppStatus.LOADING);
      setError(null);
      const output = await generateProjectPackage(data);
      setResult(output);
      setStatus(AppStatus.SUCCESS);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black">L</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Project Launchpad</h1>
          </div>
          <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
            AI-Powered Initiation
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Intro Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Launch Your Project Faster.</h2>
          <p className="text-slate-600 text-lg">
            Turn your high-level project vision into a professional initiation package in seconds. 
            Define your goals, and let Gemini build your Charter, Stakeholder Registry, and Roadmap.
          </p>
        </div>

        {/* Form Section */}
        <section className="mb-20">
          <ProjectForm onSubmit={handleGenerate} isLoading={status === AppStatus.LOADING} />
        </section>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-12 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {status === AppStatus.SUCCESS && result && (
          <div id="results-section">
            <div className="flex items-center justify-between max-w-5xl mx-auto mb-8">
              <h2 className="text-3xl font-black text-slate-900">Initiation Package</h2>
              <button 
                onClick={handleReset}
                className="text-slate-500 hover:text-blue-600 font-bold transition-colors border border-slate-200 px-4 py-2 rounded-lg hover:border-blue-200"
              >
                Create New Project
              </button>
            </div>
            <ProjectOutput data={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">Project Launchpad © 2024</p>
          <p className="text-xs mt-2 text-slate-600 max-w-md mx-auto">
            This tool uses Google Gemini Flash to generate suggestions. Please review and validate all outputs for organizational compliance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
