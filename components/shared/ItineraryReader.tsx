"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
	content: string;
}

const ItineraryRenderer = ({ content }: Props) => {
	return (
		<div
			className="prose prose-sm md:prose-base dark:prose-invert max-w-none 
                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                    prose-ul:list-disc prose-ul:pl-5 prose-li:my-1">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					// Table Styling
					table: ({ children }) => (
						<div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-card/30 backdrop-blur-md shadow-sm">
							<table className="w-full text-sm">{children}</table>
						</div>
					),
					thead: ({ children }) => (
						<thead className="bg-primary/10 text-primary uppercase text-[10px] font-bold tracking-widest">
							{children}
						</thead>
					),
					th: ({ children }) => (
						<th className="px-4 py-3 text-left border-b border-border">
							{children}
						</th>
					),
					td: ({ children }) => (
						<td className="px-4 py-3 border-b border-border/50 text-muted-foreground">
							{children}
						</td>
					),

					// List Styling (Bullet Points)
					ul: ({ children }) => (
						<ul className="space-y-2 my-4 text-foreground/80">{children}</ul>
					),
					li: ({ children }) => (
						<li className="flex gap-2 items-start">
							<span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
							<span>{children}</span>
						</li>
					),

					// Header Styling
					h1: ({ children }) => (
						<h1 className="text-2xl text-primary mt-8 mb-4">{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-xl text-foreground mt-8 mb-4 pb-2 border-b border-border flex items-center gap-2">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-lg text-foreground/90 mt-6 mb-2">{children}</h3>
					),

					// Text styling
					strong: ({ children }) => (
						<strong className="font-bold text-primary">{children}</strong>
					),
					p: ({ children }) => (
						<p className="leading-relaxed mb-4 text-foreground/80">
							{children}
						</p>
					),
				}}>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default ItineraryRenderer;
