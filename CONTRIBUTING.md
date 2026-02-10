# Contributing to VoiceInput

Thank you for your interest in contributing to VoiceInput! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

There are many ways to contribute to VoiceInput:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit bug fixes
- ✨ Add new features
- 🎨 Improve UI/UX
- 🧪 Write tests

## 📋 Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Open an issue first** - Discuss major changes before implementing
3. **Follow the code style** - Keep the codebase consistent
4. **Write tests** - Ensure your changes work correctly
5. **Update documentation** - Help others understand your changes

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/voice-input-assistant.git
cd voice-input-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Keep commits focused and atomic

### 5. Test Your Changes

```bash
# Run in development mode
npm run dev

# Build the app
npm run build

# Test the packaged app
npm run package:mac:dir
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
```

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

```typescript
// Good
interface TranscriptionResult {
  text: string;
  language: string;
  duration: number;
}

async function transcribeAudio(audioData: Buffer): Promise<TranscriptionResult> {
  // Implementation
}

// Avoid
function doStuff(data: any): any {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### File Organization

```
src/
├── main/              # Electron main process
│   ├── *.ts          # One class per file
│   └── main.ts       # Entry point
├── renderer/          # React frontend
│   ├── components/   # UI components
│   ├── services/     # Business logic
│   └── App.tsx       # Root component
└── shared/           # Shared code
    ├── types.ts      # Type definitions
    └── constants.ts  # Constants
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
  - `RecordingControl.tsx`
  - `audioProcessor.ts`
- **Classes**: PascalCase
  - `AudioRecorder`
  - `WhisperClient`
- **Functions**: camelCase
  - `startRecording()`
  - `handleTranscription()`
- **Constants**: UPPER_SNAKE_CASE
  - `MAX_FILE_SIZE`
  - `IPC_CHANNELS`

## 🧪 Testing Guidelines

### Manual Testing

Before submitting a PR, test:

1. **Recording Flow**
   - Start and stop recording
   - Test with different audio lengths
   - Test with different languages

2. **UI Interactions**
   - All buttons work correctly
   - Settings save and load properly
   - History displays correctly

3. **Error Handling**
   - Invalid API key
   - Network errors
   - Microphone permission denied

4. **Performance**
   - Memory usage stays reasonable
   - No memory leaks
   - Smooth UI interactions

### Automated Testing

We welcome contributions to add automated tests:

- Unit tests for business logic
- Integration tests for IPC communication
- E2E tests for critical user flows

## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - How to trigger the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - macOS version, app version
6. **Screenshots** - If applicable
7. **Logs** - Console output or error messages

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- macOS Version: [e.g., 13.0]
- App Version: [e.g., 1.0.0]
- Node Version: [e.g., 18.0.0]

**Additional Context**
Any other relevant information.
```

## 💡 Suggesting Features

When suggesting features, include:

1. **Use Case** - Why is this feature needed?
2. **Description** - What should the feature do?
3. **Mockups** - Visual representation (if applicable)
4. **Alternatives** - Other ways to solve the problem
5. **Priority** - How important is this feature?

### Feature Request Template

```markdown
**Problem**
Describe the problem this feature would solve.

**Proposed Solution**
Describe your proposed solution.

**Alternatives**
Describe alternative solutions you've considered.

**Additional Context**
Any other relevant information or mockups.
```

## 📚 Documentation

Good documentation is crucial. When contributing:

- Update README.md for user-facing changes
- Update code comments for implementation details
- Add JSDoc comments for public APIs
- Update QUICKSTART.md for setup changes

### Documentation Style

```typescript
/**
 * Transcribe audio using OpenAI Whisper API
 * 
 * @param audioBuffer - Audio data as Buffer
 * @param options - Transcription options
 * @returns Transcribed text
 * @throws {AppError} If transcription fails
 * 
 * @example
 * ```typescript
 * const text = await transcribeAudio(buffer, { language: 'en' });
 * ```
 */
async function transcribeAudio(
  audioBuffer: Buffer,
  options: TranscriptionOptions
): Promise<string> {
  // Implementation
}
```

## 🔍 Code Review Process

1. **Automated Checks** - CI runs automatically
2. **Maintainer Review** - A maintainer reviews your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, your PR will be merged
5. **Release** - Your contribution will be in the next release

## 🎯 Priority Areas

We especially welcome contributions in these areas:

- 🧪 **Testing** - Add unit and integration tests
- 📱 **UI/UX** - Improve user interface and experience
- 🌍 **Internationalization** - Add more language support
- 📖 **Documentation** - Improve guides and examples
- ♿ **Accessibility** - Make the app more accessible
- 🚀 **Performance** - Optimize memory and CPU usage

## ❓ Questions?

- 💬 Open a [Discussion](../../discussions)
- 🐛 Create an [Issue](../../issues)
- 📧 Contact maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## 🙏 Thank You!

Every contribution, no matter how small, makes VoiceInput better. Thank you for taking the time to contribute!

---

**Happy Coding!** 🎉
