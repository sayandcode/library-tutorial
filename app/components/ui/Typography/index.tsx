import { cn } from '~/lib/utils';

export const TypographyH1 = ({
  children,
  className,
  ...restProps
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement
>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
      {...restProps}
    >
      {children}
    </h1>
  );
};

export const TypographyP = ({
  children,
  className,
  ...restProps
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement
>) => {
  return (
    <p
      className={cn(
        'leading-7 [&:not(:first-child)]:mt-6',
        className,
      )}
      {...restProps}
    >
      {children}
    </p>
  );
};
