
import React, { useState, useRef } from 'react';
import { Upload, Play, CheckCircle2, AlertTriangle, Loader2, Info } from 'lucide-react';
import { analyzeVideoFrame } from '../services/geminiService';
import { VideoAnalysisResult, CongestionLevel } from '../types';

const VideoAnalysisView: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<VideoAnalysisResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setVideoUrl(URL.createObjectURL(selectedFile));
      setResults(null);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    
    // Draw current frame to canvas
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    // Get base64 string
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    
    // Process with Gemini
    const result = await analyzeVideoFrame(base64Image);
    setResults(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 ml-64 max-w-6xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Traffic Intelligence Pipeline</h2>
        <p className="text-slate-500 mt-2">Upload recorded footage to detect congestion and illegal parking violations.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[300px] transition-all hover:border-indigo-400 group">
            {!videoUrl ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <h3 className="font-bold text-slate-700">Choose Video File</h3>
                <p className="text-slate-400 text-sm mt-1 mb-6 text-center">MP4, MOV supported. (Ideal for CCTV/Drone footage)</p>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="video-upload" 
                />
                <label 
                  htmlFor="video-upload" 
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Select Recording
                </label>
              </>
            ) : (
              <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl">
                <video 
                  ref={videoRef} 
                  src={videoUrl} 
                  className="w-full aspect-video bg-black" 
                  controls 
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </div>

          {videoUrl && (
            <button 
              onClick={captureAndAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Play />}
              {isAnalyzing ? 'AI ANALYZING FRAME...' : 'ANALYZE CURRENT FRAME'}
            </button>
          )}

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4">
            <Info className="text-blue-500 shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>Abstraction Layer:</strong> This module uses recorded video, but the <code>VideoSource</code> class can be swapped with a <code>LiveStreamSource</code> (RTMP/HLS) for real-time deployment without changing the processing logic.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full min-h-[400px]">
            <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" />
              Intelligent Analysis Report
            </h3>

            {!results ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 italic">
                <p>Run analysis to see detected insights.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vehicle Count</p>
                    <p className="text-3xl font-bold text-slate-900">{results.vehicleCount}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    results.congestionLevel === CongestionLevel.HIGH ? 'bg-red-50' : 'bg-emerald-50'
                  }`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Density</p>
                    <p className={`text-xl font-bold ${
                      results.congestionLevel === CongestionLevel.HIGH ? 'text-red-600' : 'text-emerald-600'
                    }`}>{results.congestionLevel}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    {results.illegalParkingDetected ? <AlertTriangle className="text-red-500" size={18} /> : <CheckCircle2 className="text-emerald-500" size={18} />}
                    Violation Monitoring
                  </h4>
                  <div className={`p-5 rounded-2xl border ${
                    results.illegalParkingDetected ? 'bg-red-50 border-red-100 text-red-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                  }`}>
                    <p className="text-sm font-medium">
                      {results.illegalParkingDetected 
                        ? 'Potential Illegal Parking/Obstruction Detected. Verification Required.' 
                        : 'No parking violations detected in the current visible frame.'}
                    </p>
                  </div>
                </div>

                {results.obstructions.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-slate-500 mb-2 uppercase">Specific Obstructions</p>
                    <ul className="space-y-2">
                      {results.obstructions.map((obs, i) => (
                        <li key={i} className="text-sm bg-slate-100 px-4 py-2 rounded-lg flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {obs}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysisView;
