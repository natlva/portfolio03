$files = @("main.js", "style.css", "photo.html", "film.html")
foreach ($file in $files) {
    if (Test-Path $file) {
        $raw = [System.IO.File]::ReadAllText((Resolve-Path $file))
        # Find conflict markers
        $headIdx = $raw.IndexOf("<<<<<<< HEAD")
        if ($headIdx -eq -1) {
            Write-Output "${file}: No HEAD conflict marker found"
            continue
        }
        $dividerIdx = $raw.IndexOf("=======", $headIdx)
        if ($dividerIdx -eq -1) {
            Write-Output "${file}: No divider ======= marker found"
            continue
        }
        $endIdx = $raw.IndexOf(">>>>>>>", $dividerIdx)
        if ($endIdx -eq -1) {
            Write-Output "${file}: No end >>>>>>> marker found"
            continue
        }

        # Calculate exact start/end of the sides
        # Side A starts after <<<<<<< HEAD\r\n or <<<<<<< HEAD\n
        $startA = $headIdx + 12
        if ($raw[$startA] -eq "`r") { $startA++ }
        if ($raw[$startA] -eq "`n") { $startA++ }

        $lenA = $dividerIdx - $startA
        # Remove trailing carriage return/newlines before ======
        while ($lenA -gt 0 -and ($raw[$startA + $lenA - 1] -eq "`r" -or $raw[$startA + $lenA - 1] -eq "`n")) {
            $lenA--
        }
        $sideA = $raw.Substring($startA, $lenA)

        # Side B starts after =======\r\n or =======\n
        $startB = $dividerIdx + 7
        if ($raw[$startB] -eq "`r") { $startB++ }
        if ($raw[$startB] -eq "`n") { $startB++ }

        $lenB = $endIdx - $startB
        # Remove trailing carriage return/newlines before >>>>>>
        while ($lenB -gt 0 -and ($raw[$startB + $lenB - 1] -eq "`r" -or $raw[$startB + $lenB - 1] -eq "`n")) {
            $lenB--
        }
        $sideB = $raw.Substring($startB, $lenB)

        # Byte-for-byte comparison
        # Let's convert to bytes using same encoding (utf8 or ascii, we can just compare string/bytes using System.Text.Encoding)
        $bytesA = [System.Text.Encoding]::UTF8.GetBytes($sideA)
        $bytesB = [System.Text.Encoding]::UTF8.GetBytes($sideB)

        $identical = $true
        if ($bytesA.Length -ne $bytesB.Length) {
            $identical = $false
        } else {
            for ($i = 0; $i -lt $bytesA.Length; $i++) {
                if ($bytesA[$i] -ne $bytesB[$i]) {
                    $identical = $false
                    break
                }
            }
        }

        # Line counts
        $linesA = $sideA -split "`r?`n"
        $linesB = $sideB -split "`r?`n"
        $countA = $linesA.Length
        if ($sideA -eq "") { $countA = 0 }
        $countB = $linesB.Length
        if ($sideB -eq "") { $countB = 0 }

        Write-Output "--- ${file} ---"
        Write-Output "Line Counts: HEAD (Side A): $countA, Side B: $countB"
        if ($identical) {
            Write-Output "Conflict sides are byte-for-byte IDENTICAL."
        } else {
            Write-Output "Conflict sides are DIFFERENT."
            # Concise diff summary
            $minLines = [System.Math]::Min($linesA.Length, $linesB.Length)
            $diffFound = $false
            for ($i = 0; $i -lt $minLines; $i++) {
                if ($linesA[$i] -ne $linesB[$i]) {
                    Write-Output "First differing line at Index $i (Line $($i+1)):"
                    Write-Output "HEAD (Side A): $($linesA[$i])"
                    Write-Output "Side B:        $($linesB[$i])"
                    $diffFound = $true
                    break
                }
            }
            if (-not $diffFound) {
                # Line lengths differ but all preceding lines matched
                if ($linesA.Length -gt $linesB.Length) {
                    Write-Output "Side A has extra lines starting at line $($minLines + 1):"
                    Write-Output "HEAD (Side A): $($linesA[$minLines])"
                } else {
                    Write-Output "Side B has extra lines starting at line $($minLines + 1):"
                    Write-Output "Side B:        $($linesB[$minLines])"
                }
            }
        }
    } else {
        Write-Output "${file}: File not found"
    }
}
