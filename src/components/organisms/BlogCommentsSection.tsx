'use client';

import React, { useState, useEffect, useMemo, useId } from 'react';
import {
  MessageSquare,
  Send,
  Flag,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Lock,
  Unlock,
  Trash2,
  CornerDownRight,
  User,
  Check,
  ChevronDown,
  X,
  ThumbsUp,
  ArrowUpDown,
  SlidersHorizontal,
} from 'lucide-react';

export interface AtelierReply {
  author: string;
  role?: string;
  content: string;
  createdAt: string;
}

export interface BlogComment {
  id: string;
  slug: string;
  authorName: string;
  authorEmail?: string;
  location?: string;
  topic?: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending_review' | 'flagged' | 'rejected';
  likes?: number;
  flagCount?: number;
  flagReason?: string;
  flaggedAt?: string;
  isVerifiedClient?: boolean;
  atelierReply?: AtelierReply;
}

export type CommentSortOption = 'newest' | 'oldest' | 'most_liked';

interface BlogCommentsSectionProps {
  slug: string;
  title?: string;
}

const PRESET_LOCATIONS = [
  '🇬🇧 London, UK',
  '🇺🇸 Houston, TX',
  '🇨🇦 Toronto, ON',
  '🇦🇪 Dubai, UAE',
  '🇵🇰 Lahore, PK',
  '🇺🇸 New York, NY',
];

const PRESET_TOPICS = [
  'Fit & Scye Depth',
  'Fabric GSM & Drape',
  'Turnaround & DHL',
  'Adda Embroidery',
  'Sample Suit Courier',
  'General Question',
];

export const BlogCommentsSection: React.FC<BlogCommentsSectionProps> = ({ slug, title }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('🇬🇧 London, UK');
  const [selectedTopic, setSelectedTopic] = useState<string>('Fit & Scye Depth');
  const [content, setContent] = useState<string>('');

  // Flagging Modal / Drawer State
  const [flagTargetId, setFlagTargetId] = useState<string | null>(null);
  const [flagReason, setFlagReason] = useState<string>('Needs technical tailor clarification');
  const [isFlagging, setIsFlagging] = useState<boolean>(false);

  // Atelier Mode (Staff Review & Verified Reply)
  const [isAtelierMode, setIsAtelierMode] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [isSubmittingReply, setIsSubmittingReply] = useState<boolean>(false);

  // Sorting state: 'newest', 'oldest', 'most_liked'
  const [sortBy, setSortBy] = useState<CommentSortOption>('newest');

  // Like tracking state (set of comment IDs liked on this device)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  // Load liked IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sartor_liked_comment_ids');
      if (stored) {
        setLikedIds(new Set(JSON.parse(stored)));
      }
    } catch (err) {
      console.warn('Could not read liked comments from storage:', err);
    }
  }, []);

  const localCacheKey = `sartor_comments_${slug}`;

  // Fetch comments on mount and whenever slug changes
  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}&includeAll=true`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.comments) {
            setComments(data.comments);
            try {
              localStorage.setItem(localCacheKey, JSON.stringify(data.comments));
            } catch {
              // Ignore localStorage quota errors
            }
            return;
          }
        }
        // Fallback to local cache if network/API fails
        const cached = localStorage.getItem(localCacheKey);
        if (cached && isMounted) {
          setComments(JSON.parse(cached));
        }
      } catch (err) {
        console.warn('Network issue fetching comments, loading fallback:', err);
        const cached = localStorage.getItem(localCacheKey);
        if (cached && isMounted) {
          setComments(JSON.parse(cached));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [slug, localCacheKey]);

  // Handle toast timeout
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setErrorMessage('Please provide your name and your question/comment.');
      return;
    }
    if (content.trim().length < 5) {
      setErrorMessage('Comment must be at least 5 characters long.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      slug,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim() || undefined,
      location: location.trim(),
      topic: selectedTopic,
      content: content.trim(),
    };

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const newComment: BlogComment = data.comment;
        const updated = [newComment, ...comments];
        setComments(updated);
        try {
          localStorage.setItem(localCacheKey, JSON.stringify(updated));
        } catch {}

        setContent('');
        setSuccessToast('Your question has been posted to the Atelier Journal. Master Tailor Abdul Ghaffar reviews all technical inquiries.');
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit comment.');
      }
    } catch (err: any) {
      // Optimistic offline fallback
      const fallbackComment: BlogComment = {
        id: `cmt_offline_${Date.now()}`,
        slug,
        authorName: payload.authorName,
        location: payload.location,
        topic: payload.topic,
        content: payload.content,
        createdAt: new Date().toISOString(),
        status: 'approved',
        flagCount: 0,
      };
      const updated = [fallbackComment, ...comments];
      setComments(updated);
      try {
        localStorage.setItem(localCacheKey, JSON.stringify(updated));
      } catch {}

      setContent('');
      setSuccessToast('Comment recorded and posted to the journal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFlagComment = async () => {
    if (!flagTargetId) return;
    setIsFlagging(true);

    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(flagTargetId)}/flag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: flagReason }),
      });

      if (res.ok) {
        const data = await res.json();
        const updated = comments.map((c) => (c.id === flagTargetId ? data.comment : c));
        setComments(updated);
        try {
          localStorage.setItem(localCacheKey, JSON.stringify(updated));
        } catch {}
        setSuccessToast('Comment flagged for Atelier review. Master Tailor team will inspect.');
      } else {
        throw new Error('Could not flag comment.');
      }
    } catch {
      // Optimistic fallback
      const updated = comments.map((c) =>
        c.id === flagTargetId
          ? { ...c, status: 'flagged' as const, flagReason: flagReason, flagCount: (c.flagCount || 0) + 1 }
          : c
      );
      setComments(updated);
      try {
        localStorage.setItem(localCacheKey, JSON.stringify(updated));
      } catch {}
      setSuccessToast('Flag registered for atelier review.');
    } finally {
      setIsFlagging(false);
      setFlagTargetId(null);
    }
  };

  const handleUnlockAtelierMode = (e: React.FormEvent) => {
    e.preventDefault();
    // Default atelier PIN or quick demo code 1989
    if (pinInput.trim() === '1989' || pinInput.trim().toLowerCase() === 'sartor') {
      setIsAtelierMode(true);
      setShowPinModal(false);
      setPinInput('');
      setPinError(null);
      setSuccessToast('Atelier Staff Mode Activated — Welcome Master Tailor team.');
    } else {
      setPinError('Invalid Atelier Passcode. (Atelier PIN is 1989)');
    }
  };

  const handleAtelierModerate = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(id)}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        if (action === 'delete') {
          const updated = comments.filter((c) => c.id !== id);
          setComments(updated);
          try {
            localStorage.setItem(localCacheKey, JSON.stringify(updated));
          } catch {}
          setSuccessToast('Comment permanently deleted from journal.');
        } else {
          const data = await res.json();
          const updated = comments.map((c) => (c.id === id ? data.comment : c));
          setComments(updated);
          try {
            localStorage.setItem(localCacheKey, JSON.stringify(updated));
          } catch {}
          setSuccessToast(`Comment marked as ${action}.`);
        }
      }
    } catch (err) {
      console.error('Error moderating comment:', err);
    }
  };

  const handlePostAtelierReply = async (commentId: string) => {
    if (!replyText.trim()) return;
    setIsSubmittingReply(true);

    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(commentId)}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reply',
          authorName: 'Master Tailor Abdul Ghaffar',
          replyContent: replyText.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updated = comments.map((c) => (c.id === commentId ? data.comment : c));
        setComments(updated);
        try {
          localStorage.setItem(localCacheKey, JSON.stringify(updated));
        } catch {}
        setActiveReplyId(null);
        setReplyText('');
        setSuccessToast('Official Master Tailor reply published to journal.');
      }
    } catch (err) {
      console.error('Error posting reply:', err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleToggleLike = async (commentId: string) => {
    const isCurrentlyLiked = likedIds.has(commentId);
    const action = isCurrentlyLiked ? 'unlike' : 'like';

    // 1. Optimistic update of liked IDs
    const nextLikedIds = new Set(likedIds);
    if (isCurrentlyLiked) {
      nextLikedIds.delete(commentId);
    } else {
      nextLikedIds.add(commentId);
    }
    setLikedIds(nextLikedIds);

    try {
      localStorage.setItem('sartor_liked_comment_ids', JSON.stringify(Array.from(nextLikedIds)));
    } catch {}

    // 2. Optimistic update of local comments state
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const currentLikes = c.likes ?? 0;
          const newLikes = isCurrentlyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;
          return { ...c, likes: newLikes };
        }
        return c;
      })
    );

    // 3. Persist to server API
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(commentId)}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.likes === 'number') {
          setComments((prev) =>
            prev.map((c) => (c.id === commentId ? { ...c, likes: data.likes } : c))
          );
        }
      }
    } catch (err) {
      console.warn('Network issue persisting like, keeping optimistic value:', err);
    }
  };

  // Sort comments according to selected criteria: 'newest' | 'oldest' | 'most_liked'
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'most_liked') {
        const likesA = a.likes ?? 0;
        const likesB = b.likes ?? 0;
        if (likesB !== likesA) {
          return likesB - likesA;
        }
        // Tie-breaker: newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [comments, sortBy]);

  const flaggedCount = comments.filter((c) => c.status === 'flagged').length;
  const pendingCount = comments.filter((c) => c.status === 'pending_review').length;

  return (
    <section className="mt-16 pt-12 border-t border-stone-850" aria-label="Atelier Discussion & Q&A">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-stone-900 border border-emerald-500/40 text-stone-100 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-emerald-400">Atelier Update</p>
            <p className="text-stone-300 mt-0.5 leading-relaxed">{successToast}</p>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-stone-500 hover:text-stone-300 ml-auto p-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Atelier Discourse & Questions
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-stone-850 text-stone-300 font-mono border border-stone-800">
              {comments.length} {comments.length === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Ask the Master Tailor & Share Fitting Insights
          </h2>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Have questions about armscye depth, fabric GSM, or DHL express intake from London, Houston, Toronto, or Dubai? Join the conversation below.
          </p>
        </div>

        {/* Atelier Mode Toggle Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isAtelierMode ? (
            <button
              onClick={() => {
                setIsAtelierMode(false);
                setSuccessToast('Exited Atelier Staff Mode.');
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Atelier Mode Active</span>
            </button>
          ) : (
            <button
              onClick={() => setShowPinModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-500/30 text-xs transition-colors cursor-pointer"
              title="Atelier Staff Moderation"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Atelier Review Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Atelier Staff Notification Banner */}
      {isAtelierMode && (
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">
                Staff Moderation Session: Master Tailor Abdul Ghaffar Desk
              </p>
              <p className="text-stone-400">
                You can approve, reject, flag, or reply with verified atelier credentials.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {flaggedCount > 0 && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono font-semibold">
                ⚠️ {flaggedCount} Flagged
              </span>
            )}
            <span className="text-stone-500 font-mono">PIN: 1989 Verified</span>
          </div>
        </div>
      )}

      {/* Comment Submission Form */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
            <span>Submit a Question or Diaspora Fitting Experience</span>
          </h3>
          <span className="text-xs text-stone-400">
            Directly reviewed at Model Town Atelier
          </span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Your Name <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Khan"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-stone-500 font-normal lowercase">(private, for tailor reply)</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com (never published)"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Location Quick Select */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Diaspora Location <span className="text-amber-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {PRESET_LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    location === loc
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or enter custom city / country (e.g., Manchester, UK)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Topic Category */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Technical Inquiry Topic
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_TOPICS.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-stone-100 text-stone-950 font-semibold'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Your Question or Fitting Observation <span className="text-amber-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              maxLength={2000}
              placeholder="Ask about armhole scye depth, raw silk vs tissue durability, WhatsApp video adda reviews, or direct courier of unstitched designer suits to Shop F-9 Moon Tower Lahore..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-y leading-relaxed"
            />
            <div className="flex justify-between items-center text-xs text-stone-500 mt-1">
              <span>All technical tailoring queries are answered by Master Tailor Abdul Ghaffar.</span>
              <span>{content.length}/2000</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Zero spam policy • Atelier moderation active</span>
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Post to Atelier Journal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List Header with Sorting Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-850">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
            <span>Community Questions & Tailoring Insights</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 font-mono text-xs font-semibold">
            {sortedComments.length}
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <label htmlFor="comments-sort-dropdown" className="text-xs text-stone-400 flex items-center gap-1.5 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
            <span>Sort by:</span>
          </label>

          <div className="relative">
            <select
              id="comments-sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as CommentSortOption)}
              className="appearance-none pl-3.5 pr-8 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-semibold hover:border-stone-700 hover:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer shadow-sm"
              aria-label="Sort comments"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most_liked">Most Liked</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="py-12 text-center text-stone-500">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono uppercase tracking-wider">Loading atelier discourse...</p>
          </div>
        ) : sortedComments.length === 0 ? (
          <div className="py-12 px-6 rounded-2xl bg-stone-900/40 border border-dashed border-stone-800 text-center">
            <MessageSquare className="w-8 h-8 text-stone-600 mx-auto mb-2" />
            <h4 className="text-base font-serif font-bold text-stone-200">No Questions Posted Yet</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
              Be the first overseas client to ask Master Tailor Abdul Ghaffar about pattern drafting, seam margins, or custom stitching for this masterclass.
            </p>
          </div>
        ) : (
          sortedComments.map((comment) => {
            const isFlagged = comment.status === 'flagged';
            const isPending = comment.status === 'pending_review';

            return (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                className={`p-6 rounded-2xl transition-all ${
                  isFlagged
                    ? 'bg-rose-950/20 border border-rose-500/40'
                    : 'bg-stone-900/80 border border-stone-850 hover:border-stone-800 shadow-md'
                }`}
              >
                {/* Author Info & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-stone-800 to-stone-700 border border-stone-650 flex items-center justify-center font-serif font-bold text-stone-200 text-sm">
                      {comment.authorName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase() || 'S'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-100 text-sm">
                          {comment.authorName}
                        </span>
                        {comment.isVerifiedClient && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold"
                            title="Verified Sartor Overseas Client"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified Client</span>
                          </span>
                        )}
                        {comment.topic && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                            {comment.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        {comment.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-500/80" />
                            <span>{comment.location}</span>
                          </span>
                        )}
                        <span>•</span>
                        <span className="flex items-center gap-1 text-stone-400">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 text-xs">
                    {isFlagged && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-900/40 text-rose-300 border border-rose-500/30 font-mono font-medium text-[11px]">
                        <Flag className="w-3 h-3" />
                        <span>Under Atelier Review</span>
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-900/30 text-amber-300 border border-amber-500/30 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>Pending Review</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line pl-1">
                  {comment.content}
                </p>

                {/* Flag Notice if flagged */}
                {isFlagged && comment.flagReason && (
                  <div className="mt-3 p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>
                        <strong>Moderation Flag:</strong> {comment.flagReason}
                      </span>
                    </span>
                    {isAtelierMode && (
                      <button
                        onClick={() => handleAtelierModerate(comment.id, 'approve')}
                        className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-700 text-[10px] font-semibold cursor-pointer"
                      >
                        Dismiss Flag
                      </button>
                    )}
                  </div>
                )}

                {/* Verified Atelier Response (if present) */}
                {comment.atelierReply && (
                  <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-amber-950/30 via-stone-900 to-stone-900/90 border border-amber-500/40 shadow-inner">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-serif font-bold text-xs shadow">
                          AG
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-serif font-bold text-amber-300">
                              {comment.atelierReply.author}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono uppercase font-semibold border border-amber-500/30">
                              <Sparkles className="w-2.5 h-2.5" /> Verified Atelier
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400">
                            {comment.atelierReply.role || 'SARTOR Model Town, Lahore'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(comment.atelierReply.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed pl-1 whitespace-pre-line border-l-2 border-amber-500/40 ml-1 pl-3.5 my-1">
                      {comment.atelierReply.content}
                    </p>
                  </div>
                )}

                {/* Inline Tailor Reply Box (when active in Atelier Mode) */}
                {activeReplyId === comment.id && (
                  <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-amber-500/40">
                    <p className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                      <CornerDownRight className="w-4 h-4" />
                      <span>Compose Official Atelier Answer (Signed as Master Tailor Abdul Ghaffar):</span>
                    </p>
                    <textarea
                      rows={3}
                      placeholder="Address scye depth adjustment, fabric shrinkage allowance, WhatsApp adda inspection..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-3 rounded-lg bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-y"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText('');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePostAtelierReply(comment.id)}
                        disabled={isSubmittingReply || !replyText.trim()}
                        className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmittingReply ? 'Publishing...' : 'Publish Atelier Reply'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-850 text-xs text-stone-400">
                  <div className="flex items-center gap-3">
                    {/* Like / Helpful Counter Button */}
                    <button
                      onClick={() => handleToggleLike(comment.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        likedIds.has(comment.id)
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 font-semibold shadow-sm'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                      title={likedIds.has(comment.id) ? 'Unlike this question' : 'Mark this technical discussion as helpful'}
                    >
                      <ThumbsUp
                        className={`w-3.5 h-3.5 transition-transform ${
                          likedIds.has(comment.id) ? 'fill-current text-amber-400 scale-110' : ''
                        }`}
                      />
                      <span>{comment.likes || 0}</span>
                      <span className="hidden sm:inline">
                        {comment.likes === 1 ? 'Helpful' : 'Helpful'}
                      </span>
                    </button>

                    {/* User Flag Button */}
                    <button
                      onClick={() => {
                        setFlagTargetId(comment.id);
                        setFlagReason('Needs technical tailor clarification');
                      }}
                      className="inline-flex items-center gap-1.5 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer text-xs"
                      title="Flag this entry for Atelier review"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Flag for Atelier Review</span>
                    </button>

                    <a
                      href={`https://wa.me/923320500904?text=${encodeURIComponent(
                        `Assalam-o-Alaikum Sartor Atelier, regarding comment on "${title || slug}": "${comment.content.slice(0, 80)}..."`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-stone-400 hover:text-emerald-400 transition-colors"
                    >
                      <span>Discuss on WhatsApp</span>
                    </a>
                  </div>

                  {/* Atelier Staff Controls */}
                  {isAtelierMode && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                          setReplyText('');
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold cursor-pointer"
                      >
                        Reply as Master Tailor
                      </button>
                      {comment.status !== 'approved' && (
                        <button
                          onClick={() => handleAtelierModerate(comment.id, 'approve')}
                          className="px-2.5 py-1 rounded bg-emerald-950/50 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleAtelierModerate(comment.id, 'delete')}
                        className="p-1 rounded bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-400 border border-stone-800 text-xs cursor-pointer"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Flagging Modal */}
      {flagTargetId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-rose-400" />
                <h4 className="text-base font-serif font-bold">Flag for Atelier Review</h4>
              </div>
              <button
                onClick={() => setFlagTargetId(null)}
                className="text-stone-400 hover:text-stone-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              Help our master tailors keep the Atelier Journal technically precise, respectful, and free of commercial solicitation. Select a reason below:
            </p>

            <div className="space-y-2 mb-5">
              {[
                'Needs technical tailor clarification',
                'Incorrect or misleading fit advice',
                'Inappropriate, spam, or promotional solicitation',
                'Duplicate or off-topic discussion',
              ].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    flagReason === reason
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="flag_reason"
                    checked={flagReason === reason}
                    onChange={() => setFlagReason(reason)}
                    className="accent-rose-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setFlagTargetId(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-750 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFlagComment}
                disabled={isFlagging}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isFlagging ? 'Submitting...' : 'Confirm Moderation Flag'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Atelier Staff PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-serif font-bold">Atelier Staff Access</h4>
              </div>
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPinError(null);
                }}
                className="text-stone-400 hover:text-stone-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              Enter your Atelier Staff PIN to review flagged inquiries, approve comments, and issue official verified answers as Master Tailor Abdul Ghaffar.
            </p>

            {pinError && (
              <div className="mb-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {pinError}
              </div>
            )}

            <form onSubmit={handleUnlockAtelierMode} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Atelier PIN <span className="text-stone-500">(Master Code: 1989)</span>
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter 1989"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 font-mono text-center tracking-widest text-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinError(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Unlock Staff Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogCommentsSection;
