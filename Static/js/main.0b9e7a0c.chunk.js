(this["webpackJsonpcandymachine-v2-boiler-mint-site-noflp"] = this["webpackJsonpcandymachine-v2-boiler-mint-site-noflp"] || []).push([
    [0], {
        131: function(e, t, n) {
            "use strict";
            (function(e) {
                n.d(t, "a", (function() {
                    return b
                })), n.d(t, "b", (function() {
                    return j
                })), n.d(t, "c", (function() {
                    return f
                })), n.d(t, "d", (function() {
                    return O
                }));
                var a = n(13),
                    r = n(6),
                    i = n(1),
                    s = n.n(i),
                    c = n(26),
                    o = n(42),
                    l = n(7),
                    u = n(221),
                    d = n(47),
                    b = new c.e.PublicKey("cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"),
                    h = new c.e.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
                    j = function() {
                        var e = Object(r.a)(s.a.mark((function e(t, n, a) {
                            var i, c, o, l, u = arguments;
                            return s.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return u.length > 3 && void 0 !== u[3] ? u[3] : "recent", i = u.length > 4 && void 0 !== u[4] && u[4], c = !1, o = {
                                            slot: 0,
                                            confirmations: 0,
                                            err: null
                                        }, l = 0, e.next = 7, new Promise(function() {
                                            var e = Object(r.a)(s.a.mark((function e(l, u) {
                                                return s.a.wrap((function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                        case 0:
                                                            setTimeout((function() {
                                                                c || (c = !0, console.log("Rejecting for timeout..."), u({
                                                                    timeout: !0
                                                                }))
                                                            }), n);
                                                        case 1:
                                                            if (c || !i) {
                                                                e.next = 7;
                                                                break
                                                            }
                                                            return Object(r.a)(s.a.mark((function e() {
                                                                var n;
                                                                return s.a.wrap((function(e) {
                                                                    for (;;) switch (e.prev = e.next) {
                                                                        case 0:
                                                                            return e.prev = 0, e.next = 3, a.getSignatureStatuses([t]);
                                                                        case 3:
                                                                            n = e.sent, o = n && n.value[0], c || (o ? o.err ? (console.log("REST error for", t, o), c = !0, u(o.err)) : o.confirmations ? (console.log("REST confirmation for", t, o), c = !0, l(o)) : console.log("REST no confirmations for", t, o) : console.log("REST null result for", t, o)), e.next = 11;
                                                                            break;
                                                                        case 8:
                                                                            e.prev = 8, e.t0 = e.catch(0), c || console.log("REST connection error: txid", t, e.t0);
                                                                        case 11:
                                                                        case "end":
                                                                            return e.stop()
                                                                    }
                                                                }), e, null, [
                                                                    [0, 8]
                                                                ])
                                                            })))(), e.next = 5, v(2e3);
                                                        case 5:
                                                            e.next = 1;
                                                            break;
                                                        case 7:
                                                        case "end":
                                                            return e.stop()
                                                    }
                                                }), e)
                                            })));
                                            return function(t, n) {
                                                return e.apply(this, arguments)
                                            }
                                        }());
                                    case 7:
                                        return o = e.sent, a._signatureSubscriptions[l] && a.removeSignatureListener(l), c = !0, console.log("Returning status", o), e.abrupt("return", o);
                                    case 12:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function(t, n, a) {
                            return e.apply(this, arguments)
                        }
                    }(),
                    p = function(t, n, a, r) {
                        var i = [{
                            pubkey: n,
                            isSigner: !0,
                            isWritable: !0
                        }, {
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: a,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: c.e.SystemProgram.programId,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: o.b,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: c.e.SYSVAR_RENT_PUBKEY,
                            isSigner: !1,
                            isWritable: !1
                        }];
                        return new c.e.TransactionInstruction({
                            keys: i,
                            programId: d.b,
                            data: e.from([])
                        })
                    },
                    f = function() {
                        var e = Object(r.a)(s.a.mark((function e(t, n, a) {
                            var r, i, o, l, u, d, h;
                            return s.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return r = new c.c(a, t, {
                                            preflightCommitment: "recent"
                                        }), e.next = 3, c.b.fetchIdl(b, r);
                                    case 3:
                                        return i = e.sent, o = new c.b(i, b, r), e.next = 7, o.account.candyMachine.fetch(n);
                                    case 7:
                                        return l = e.sent, u = l.data.itemsAvailable.toNumber(), d = l.itemsRedeemed.toNumber(), h = u - d, e.abrupt("return", {
                                            id: n,
                                            program: o,
                                            state: {
                                                itemsAvailable: u,
                                                itemsRedeemed: d,
                                                itemsRemaining: h,
                                                isSoldOut: 0 === h,
                                                isActive: l.data.goLiveDate.toNumber() < (new Date).getTime() / 1e3 && (!l.endSettings || (l.endSettings.endSettingType.date ? l.endSettings.number.toNumber() > (new Date).getTime() / 1e3 : d < l.endSettings.number.toNumber())),
                                                goLiveDate: l.data.goLiveDate,
                                                treasury: l.wallet,
                                                tokenMint: l.tokenMint,
                                                gatekeeper: l.data.gatekeeper,
                                                endSettings: l.data.endSettings,
                                                whitelistMintSettings: l.data.whitelistMintSettings,
                                                hiddenSettings: l.data.hiddenSettings,
                                                price: l.data.price
                                            }
                                        });
                                    case 12:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function(t, n, a) {
                            return e.apply(this, arguments)
                        }
                    }(),
                    m = function() {
                        var t = Object(r.a)(s.a.mark((function t(n) {
                            return s.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, c.e.PublicKey.findProgramAddress([e.from("metadata"), h.toBuffer(), n.toBuffer(), e.from("edition")], h);
                                    case 2:
                                        return t.abrupt("return", t.sent[0]);
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(),
                    x = function() {
                        var t = Object(r.a)(s.a.mark((function t(n) {
                            return s.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, c.e.PublicKey.findProgramAddress([e.from("metadata"), h.toBuffer(), n.toBuffer()], h);
                                    case 2:
                                        return t.abrupt("return", t.sent[0]);
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(),
                    g = function() {
                        var t = Object(r.a)(s.a.mark((function t(n) {
                            return s.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, c.e.PublicKey.findProgramAddress([e.from("candy_machine"), n.toBuffer()], b);
                                    case 2:
                                        return t.abrupt("return", t.sent);
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(),
                    O = function() {
                        var e = Object(r.a)(s.a.mark((function e(t, n) {
                            var r, i, b, j, f, O, v, y, w, k, S, T, N, P, M, C, A, R;
                            return s.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return r = c.e.Keypair.generate(), e.next = 3, Object(d.c)(r.publicKey, n);
                                    case 3:
                                        if (i = e.sent[0], !t.state.tokenMint) {
                                            e.next = 10;
                                            break
                                        }
                                        return e.next = 7, Object(d.c)(t.state.tokenMint, n);
                                    case 7:
                                        e.t0 = e.sent[0], e.next = 11;
                                        break;
                                    case 10:
                                        e.t0 = n;
                                    case 11:
                                        return b = e.t0, j = t.id, f = [], O = [r], v = [], e.t1 = c.e.SystemProgram, e.t2 = n, e.t3 = r.publicKey, e.t4 = o.a.span, e.next = 22, t.program.provider.connection.getMinimumBalanceForRentExemption(o.a.span);
                                    case 22:
                                        if (e.t5 = e.sent, e.t6 = o.b, e.t7 = {
                                                fromPubkey: e.t2,
                                                newAccountPubkey: e.t3,
                                                space: e.t4,
                                                lamports: e.t5,
                                                programId: e.t6
                                            }, e.t8 = e.t1.createAccount.call(e.t1, e.t7), e.t9 = o.c.createInitMintInstruction(o.b, r.publicKey, 0, n, n), e.t10 = p(i, n, n, r.publicKey), e.t11 = o.c.createMintToInstruction(o.b, r.publicKey, i, n, [], 1), y = [e.t8, e.t9, e.t10, e.t11], !t.state.gatekeeper) {
                                            e.next = 45;
                                            break
                                        }
                                        return e.t12 = f, e.next = 34, Object(d.e)(n, t.state.gatekeeper.gatekeeperNetwork);
                                    case 34:
                                        if (e.t13 = e.sent[0], e.t14 = {
                                                pubkey: e.t13,
                                                isWritable: !0,
                                                isSigner: !1
                                            }, e.t12.push.call(e.t12, e.t14), !t.state.gatekeeper.expireOnUse) {
                                            e.next = 45;
                                            break
                                        }
                                        return f.push({
                                            pubkey: d.a,
                                            isWritable: !1,
                                            isSigner: !1
                                        }), e.t15 = f, e.next = 42, Object(d.d)(t.state.gatekeeper.gatekeeperNetwork);
                                    case 42:
                                        e.t16 = e.sent[0], e.t17 = {
                                            pubkey: e.t16,
                                            isWritable: !1,
                                            isSigner: !1
                                        }, e.t15.push.call(e.t15, e.t17);
                                    case 45:
                                        if (!t.state.whitelistMintSettings) {
                                            e.next = 60;
                                            break
                                        }
                                        return w = new c.e.PublicKey(t.state.whitelistMintSettings.mint), e.next = 49, Object(d.c)(w, n);
                                    case 49:
                                        if (k = e.sent[0], f.push({
                                                pubkey: k,
                                                isWritable: !0,
                                                isSigner: !1
                                            }), !t.state.whitelistMintSettings.mode.burnEveryTime) {
                                            e.next = 60;
                                            break
                                        }
                                        return S = c.e.Keypair.generate(), f.push({
                                            pubkey: w,
                                            isWritable: !0,
                                            isSigner: !1
                                        }), f.push({
                                            pubkey: S.publicKey,
                                            isWritable: !1,
                                            isSigner: !0
                                        }), O.push(S), e.next = 58, t.program.provider.connection.getAccountInfo(k);
                                    case 58:
                                        e.sent && (y.push(o.c.createApproveInstruction(o.b, k, S.publicKey, n, [], 1)), v.push(o.c.createRevokeInstruction(o.b, k, n, [])));
                                    case 60:
                                        return t.state.tokenMint && (T = c.e.Keypair.generate(), O.push(T), f.push({
                                            pubkey: b,
                                            isWritable: !0,
                                            isSigner: !1
                                        }), f.push({
                                            pubkey: T.publicKey,
                                            isWritable: !1,
                                            isSigner: !0
                                        }), y.push(o.c.createApproveInstruction(o.b, b, T.publicKey, n, [], t.state.price.toNumber())), v.push(o.c.createRevokeInstruction(o.b, b, n, []))), e.next = 63, x(r.publicKey);
                                    case 63:
                                        return N = e.sent, e.next = 66, m(r.publicKey);
                                    case 66:
                                        return P = e.sent, e.next = 69, g(j);
                                    case 69:
                                        return M = e.sent, C = Object(a.a)(M, 2), A = C[0], R = C[1], e.t18 = y, e.next = 76, t.program.instruction.mintNft(R, {
                                            accounts: {
                                                candyMachine: j,
                                                candyMachineCreator: A,
                                                payer: n,
                                                wallet: t.state.treasury,
                                                mint: r.publicKey,
                                                metadata: N,
                                                masterEdition: P,
                                                mintAuthority: n,
                                                updateAuthority: n,
                                                tokenMetadataProgram: h,
                                                tokenProgram: o.b,
                                                systemProgram: l.SystemProgram.programId,
                                                rent: c.e.SYSVAR_RENT_PUBKEY,
                                                clock: c.e.SYSVAR_CLOCK_PUBKEY,
                                                recentBlockhashes: c.e.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
                                                instructionSysvarAccount: c.e.SYSVAR_INSTRUCTIONS_PUBKEY
                                            },
                                            remainingAccounts: f.length > 0 ? f : void 0
                                        });
                                    case 76:
                                        return e.t19 = e.sent, e.t18.push.call(e.t18, e.t19), e.prev = 78, e.next = 81, Object(u.a)(t.program.provider.connection, t.program.provider.wallet, [y, v], [O, []]);
                                    case 81:
                                        return e.abrupt("return", e.sent.txs.map((function(e) {
                                            return e.txid
                                        })));
                                    case 84:
                                        e.prev = 84, e.t20 = e.catch(78), console.log(e.t20);
                                    case 87:
                                        return e.abrupt("return", []);
                                    case 88:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, null, [
                                [78, 84]
                            ])
                        })));
                        return function(t, n) {
                            return e.apply(this, arguments)
                        }
                    }(),
                    v = function(e) {
                        return new Promise((function(t) {
                            return setTimeout(t, e)
                        }))
                    }
            }).call(this, n(21).Buffer)
        },
        221: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return u
            }));
            var a, r = n(20),
                i = n(6),
                s = n(1),
                c = n.n(s),
                o = n(7),
                l = n(121);
            ! function(e) {
                e[e.Sequential = 0] = "Sequential", e[e.Parallel = 1] = "Parallel", e[e.StopOnFailure = 2] = "StopOnFailure"
            }(a || (a = {}));
            var u = function() {
                    var e = Object(i.a)(c.a.mark((function e(t, n, i, s) {
                        var u, d, b, j, p, f, m, x, g, O, v, y, w, k, S = arguments;
                        return c.a.wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (u = S.length > 4 && void 0 !== S[4] ? S[4] : a.Parallel, d = S.length > 5 && void 0 !== S[5] ? S[5] : "singleGossip", b = S.length > 6 && void 0 !== S[6] ? S[6] : function(e, t) {}, j = S.length > 7 && void 0 !== S[7] ? S[7] : function(e, t) {
                                            return !1
                                        }, p = S.length > 8 ? S[8] : void 0, n.publicKey) {
                                        e.next = 7;
                                        break
                                    }
                                    throw new l.f;
                                case 7:
                                    if (f = [], p) {
                                        e.next = 12;
                                        break
                                    }
                                    return e.next = 11, t.getRecentBlockhash(d);
                                case 11:
                                    p = e.sent;
                                case 12:
                                    m = function(e) {
                                        var t = i[e],
                                            a = s[e];
                                        if (0 === t.length) return "continue";
                                        var c = new o.Transaction;
                                        t.forEach((function(e) {
                                            return c.add(e)
                                        })), c.recentBlockhash = p.blockhash, c.setSigners.apply(c, [n.publicKey].concat(Object(r.a)(a.map((function(e) {
                                            return e.publicKey
                                        }))))), a.length > 0 && c.partialSign.apply(c, Object(r.a)(a)), f.push(c)
                                    }, x = 0;
                                case 14:
                                    if (!(x < i.length)) {
                                        e.next = 21;
                                        break
                                    }
                                    if ("continue" !== m(x)) {
                                        e.next = 18;
                                        break
                                    }
                                    return e.abrupt("continue", 18);
                                case 18:
                                    x++, e.next = 14;
                                    break;
                                case 21:
                                    return e.next = 23, n.signAllTransactions(f);
                                case 23:
                                    g = e.sent, O = [], v = {
                                        breakEarly: !1,
                                        i: 0
                                    }, console.log("Signed txns length", g.length, "vs handed in length", i.length), y = c.a.mark((function e(n) {
                                        var r;
                                        return c.a.wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    if ((r = h({
                                                            connection: t,
                                                            signedTransaction: g[n]
                                                        })).then((function(e) {
                                                            var t = e.txid;
                                                            e.slot;
                                                            b(t, n)
                                                        })).catch((function(e) {
                                                            j(g[n], n), u === a.StopOnFailure && (v.breakEarly = !0, v.i = n)
                                                        })), u === a.Parallel) {
                                                        e.next = 21;
                                                        break
                                                    }
                                                    return e.prev = 3, e.next = 6, r;
                                                case 6:
                                                    e.next = 19;
                                                    break;
                                                case 8:
                                                    if (e.prev = 8, e.t0 = e.catch(3), console.log("Caught failure", e.t0), !v.breakEarly) {
                                                        e.next = 19;
                                                        break
                                                    }
                                                    return console.log("Died on ", v.i), e.t1 = v.i, e.next = 16, Promise.all(O);
                                                case 16:
                                                    return e.t2 = e.sent, e.t3 = {
                                                        number: e.t1,
                                                        txs: e.t2
                                                    }, e.abrupt("return", {
                                                        v: e.t3
                                                    });
                                                case 19:
                                                    e.next = 22;
                                                    break;
                                                case 21:
                                                    O.push(r);
                                                case 22:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }), e, null, [
                                            [3, 8]
                                        ])
                                    })), w = 0;
                                case 29:
                                    if (!(w < g.length)) {
                                        e.next = 37;
                                        break
                                    }
                                    return e.delegateYield(y(w), "t0", 31);
                                case 31:
                                    if ("object" !== typeof(k = e.t0)) {
                                        e.next = 34;
                                        break
                                    }
                                    return e.abrupt("return", k.v);
                                case 34:
                                    w++, e.next = 29;
                                    break;
                                case 37:
                                    if (u === a.Parallel) {
                                        e.next = 40;
                                        break
                                    }
                                    return e.next = 40, Promise.all(O);
                                case 40:
                                    return e.t1 = g.length, e.next = 43, Promise.all(O);
                                case 43:
                                    return e.t2 = e.sent, e.abrupt("return", {
                                        number: e.t1,
                                        txs: e.t2
                                    });
                                case 45:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, a, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                d = function() {
                    return (new Date).getTime() / 1e3
                },
                b = 15e3;

            function h(e) {
                return j.apply(this, arguments)
            }

            function j() {
                return (j = Object(i.a)(c.a.mark((function e(t) {
                    var n, a, r, s, o, l, u, h, j, f, x, O, v;
                    return c.a.wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return n = t.signedTransaction, a = t.connection, r = t.timeout, s = void 0 === r ? b : r, o = n.serialize(), l = d(), u = 0, e.next = 6, a.sendRawTransaction(o, {
                                    skipPreflight: !0
                                });
                            case 6:
                                return h = e.sent, console.log("Started awaiting confirmation for", h), j = !1, Object(i.a)(c.a.mark((function e() {
                                    return c.a.wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                if (j || !(d() - l < s)) {
                                                    e.next = 6;
                                                    break
                                                }
                                                return a.sendRawTransaction(o, {
                                                    skipPreflight: !0
                                                }), e.next = 4, g(500);
                                            case 4:
                                                e.next = 0;
                                                break;
                                            case 6:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e)
                                })))(), e.prev = 10, e.next = 13, m(h, s, a, "recent", !0);
                            case 13:
                                if (f = e.sent) {
                                    e.next = 16;
                                    break
                                }
                                throw new Error("Timed out awaiting confirmation on transaction");
                            case 16:
                                if (!f.err) {
                                    e.next = 19;
                                    break
                                }
                                throw console.error(f.err), new Error("Transaction failed: Custom instruction error");
                            case 19:
                                u = (null === f || void 0 === f ? void 0 : f.slot) || 0, e.next = 47;
                                break;
                            case 22:
                                if (e.prev = 22, e.t0 = e.catch(10), console.error("Timeout Error caught", e.t0), !e.t0.timeout) {
                                    e.next = 27;
                                    break
                                }
                                throw new Error("Timed out awaiting confirmation on transaction");
                            case 27:
                                return x = null, e.prev = 28, e.next = 31, p(a, n, "single");
                            case 31:
                                x = e.sent.value, e.next = 36;
                                break;
                            case 34:
                                e.prev = 34, e.t1 = e.catch(28);
                            case 36:
                                if (!x || !x.err) {
                                    e.next = 47;
                                    break
                                }
                                if (!x.logs) {
                                    e.next = 46;
                                    break
                                }
                                O = x.logs.length - 1;
                            case 39:
                                if (!(O >= 0)) {
                                    e.next = 46;
                                    break
                                }
                                if (!(v = x.logs[O]).startsWith("Program log: ")) {
                                    e.next = 43;
                                    break
                                }
                                throw new Error("Transaction failed: " + v.slice("Program log: ".length));
                            case 43:
                                --O, e.next = 39;
                                break;
                            case 46:
                                throw new Error(JSON.stringify(x.err));
                            case 47:
                                return e.prev = 47, j = !0, e.finish(47);
                            case 50:
                                return console.log("Latency", h, d() - l), e.abrupt("return", {
                                    txid: h,
                                    slot: u
                                });
                            case 52:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [10, 22, 47, 50],
                        [28, 34]
                    ])
                })))).apply(this, arguments)
            }

            function p(e, t, n) {
                return f.apply(this, arguments)
            }

            function f() {
                return (f = Object(i.a)(c.a.mark((function e(t, n, a) {
                    var r, i, s, o, l;
                    return c.a.wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, t._recentBlockhash(t._disableBlockhashCaching);
                            case 2:
                                return n.recentBlockhash = e.sent, r = n.serializeMessage(), i = n._serialize(r), s = i.toString("base64"), o = [s, {
                                    encoding: "base64",
                                    commitment: a
                                }], e.next = 10, t._rpcRequest("simulateTransaction", o);
                            case 10:
                                if (!(l = e.sent).error) {
                                    e.next = 13;
                                    break
                                }
                                throw new Error("failed to simulate transaction: " + l.error.message);
                            case 13:
                                return e.abrupt("return", l.result);
                            case 14:
                            case "end":
                                return e.stop()
                        }
                    }), e)
                })))).apply(this, arguments)
            }

            function m(e, t, n) {
                return x.apply(this, arguments)
            }

            function x() {
                return x = Object(i.a)(c.a.mark((function e(t, n, a) {
                    var r, s, o, l, u, d = arguments;
                    return c.a.wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return r = d.length > 3 && void 0 !== d[3] ? d[3] : "recent", s = d.length > 4 && void 0 !== d[4] && d[4], o = !1, l = {
                                    slot: 0,
                                    confirmations: 0,
                                    err: null
                                }, u = 0, e.next = 7, new Promise(function() {
                                    var e = Object(i.a)(c.a.mark((function e(d, b) {
                                        return c.a.wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    setTimeout((function() {
                                                        o || (o = !0, console.log("Rejecting for timeout..."), b({
                                                            timeout: !0
                                                        }))
                                                    }), n);
                                                    try {
                                                        u = a.onSignature(t, (function(e, t) {
                                                            o = !0, l = {
                                                                err: e.err,
                                                                slot: t.slot,
                                                                confirmations: 0
                                                            }, e.err ? (console.log("Rejected via websocket", e.err), b(l)) : (console.log("Resolved via websocket", e), d(l))
                                                        }), r)
                                                    } catch (h) {
                                                        o = !0, console.error("WS error in setup", t, h)
                                                    }
                                                case 2:
                                                    if (o || !s) {
                                                        e.next = 8;
                                                        break
                                                    }
                                                    return Object(i.a)(c.a.mark((function e() {
                                                        var n;
                                                        return c.a.wrap((function(e) {
                                                            for (;;) switch (e.prev = e.next) {
                                                                case 0:
                                                                    return e.prev = 0, e.next = 3, a.getSignatureStatuses([t]);
                                                                case 3:
                                                                    n = e.sent, l = n && n.value[0], o || (l ? l.err ? (console.log("REST error for", t, l), o = !0, b(l.err)) : l.confirmations ? (console.log("REST confirmation for", t, l), o = !0, d(l)) : console.log("REST no confirmations for", t, l) : console.log("REST null result for", t, l)), e.next = 11;
                                                                    break;
                                                                case 8:
                                                                    e.prev = 8, e.t0 = e.catch(0), o || console.log("REST connection error: txid", t, e.t0);
                                                                case 11:
                                                                case "end":
                                                                    return e.stop()
                                                            }
                                                        }), e, null, [
                                                            [0, 8]
                                                        ])
                                                    })))(), e.next = 6, g(2e3);
                                                case 6:
                                                    e.next = 2;
                                                    break;
                                                case 8:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }), e)
                                    })));
                                    return function(t, n) {
                                        return e.apply(this, arguments)
                                    }
                                }());
                            case 7:
                                return l = e.sent, a._signatureSubscriptions[u] && a.removeSignatureListener(u), o = !0, console.log("Returning status", l), e.abrupt("return", l);
                            case 12:
                            case "end":
                                return e.stop()
                        }
                    }), e)
                }))), x.apply(this, arguments)
            }

            function g(e) {
                return new Promise((function(t) {
                    return setTimeout(t, e)
                }))
            }
        },
        247: function(e, t, n) {},
        248: function(e, t, n) {},
        250: function(e, t) {},
        253: function(e, t) {},
        265: function(e, t) {},
        276: function(e, t) {},
        277: function(e, t) {},
        298: function(e, t) {},
        301: function(e, t) {},
        307: function(e, t) {},
        319: function(e, t, n) {
            "use strict";
            n.r(t);
            var a = n(0),
                r = n.n(a),
                i = n(33),
                s = n.n(i),
                c = (n(247), n(248), n(22)),
                o = n(6),
                l = n(13),
                u = n(53),
                d = n(1),
                b = n.n(d),
                h = n(73),
                j = n(376),
                p = n(390),
                f = n(370),
                m = n(375),
                x = n(385),
                g = n(7),
                O = n(212),
                v = n(162),
                y = n(131),
                w = n(368),
                k = n(374),
                S = n(107),
                T = n(9),
                N = n(8),
                P = n(16),
                M = n(17),
                C = n(26),
                A = n(4);

            function R(e) {
                return new C.a(new Date(e).getTime() / 1e3)
            }
            var E, W, D = !1,
                I = "Minting Paused",
                K = "We have dectected and issue while minting. Standby for an update",
                L = {
                    title: "Welcome!",
                    desc: "Connect your wallet and load in! Whitelist mint starts soon!",
                    countdownEnable: !0,
                    countdownTo: R("2 May 2022 00:00:00 GMT"),
                    showPrice: !1,
                    enableCustomHTML: !0
                },
                F = function(e) {
                    Object(P.a)(n, e);
                    var t = Object(M.a)(n);

                    function n() {
                        return Object(T.a)(this, n), t.apply(this, arguments)
                    }
                    return Object(N.a)(n, [{
                        key: "render",
                        value: function() {
                            return Object(A.jsx)("div", {
                                className: "custom-mint-container",
                                children: Object(A.jsx)("img", {
                                    src: "assets/gif.gif"
                                })
                            })
                        }
                    }]), n
                }(r.a.Component),
                _ = {
                    enabled: !1,
                    startDate: R("1 Jan 2022 00:00:00 GMT"),
                    endDate: R("8 Jan 2022 00:00:00 GMT"),
                    countdown: !0,
                    title: "White List",
                    desc: void 0,
                    enableCustomHTML: !1
                },
                B = function(e) {
                    Object(P.a)(n, e);
                    var t = Object(M.a)(n);

                    function n() {
                        return Object(T.a)(this, n), t.apply(this, arguments)
                    }
                    return Object(N.a)(n, [{
                        key: "render",
                        value: function() {
                            return Object(A.jsx)("div", {
                                className: "custom-mint-container",
                                children: Object(A.jsx)("p", {
                                    children: "Test 2"
                                })
                            })
                        }
                    }]), n
                }(r.a.Component),
                H = {
                    startDate: R("2 May 2022 00:00:00 GMT"),
                    endDate: void 0,
                    countdown: !1,
                    title: "Public Sale",
                    desc: "Sale is now live. Mint your NFT below",
                    enableCustomHTML: !0
                },
                U = function(e) {
                    Object(P.a)(n, e);
                    var t = Object(M.a)(n);

                    function n() {
                        return Object(T.a)(this, n), t.apply(this, arguments)
                    }
                    return Object(N.a)(n, [{
                        key: "render",
                        value: function() {
                            return Object(A.jsx)("div", {
                                className: "custom-mint-container",
                                children: Object(A.jsx)("img", {
                                    src: "assets/gif.gif"
                                })
                            })
                        }
                    }]), n
                }(r.a.Component),
                G = n(47),
                Y = Object(h.a)(w.a)(E || (E = Object(u.a)(["\n  \n  width: 100%;\n  height: 60px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  background: linear-gradient(180deg, #021627 0%, #021627 100%);\n  border: 1px solid #eead0e;\n  color: white;\n  font-size: 16px;\n  font-weight: bold;\n"]))),
                q = function(e) {
                    var t, n, r, i, s = e.onMint,
                        c = e.candyMachine,
                        u = e.isMinting,
                        d = Object(S.c)(),
                        h = d.requestGatewayToken,
                        j = d.gatewayStatus,
                        p = Object(a.useState)(!1),
                        f = Object(l.a)(p, 2),
                        m = f[0],
                        x = f[1],
                        g = null === (t = Object(G.f)(_.startDate)) || void 0 === t ? void 0 : t.getTime(),
                        O = null === (n = Object(G.f)(_.endDate)) || void 0 === n ? void 0 : n.getTime(),
                        v = null === (r = Object(G.f)(H.startDate)) || void 0 === r ? void 0 : r.getTime(),
                        y = null === (i = Object(G.f)(H.endDate)) || void 0 === i ? void 0 : i.getTime();

                    function w() {
                        return !!(_.enabled && g && O && Date.now() > g && Date.now() < O)
                    }
                    var T = w();

                    function N() {
                        return v && y ? Date.now() > v && Date.now() < y : v ? Date.now() > v : void 0
                    }
                    console.log("is Whitelist Sale Active? " + w());
                    var P = N();
                    return console.log("is public sale live? " + N()), console.log(null === c || void 0 === c ? void 0 : c.state.isSoldOut, u, T || P, !(null !== c && void 0 !== c && c.state.isActive)), Object(a.useEffect)((function() {
                        j === S.b.ACTIVE && m && (console.log("Minting"), s(), x(!1))
                    }), [j, m, x, s]), Object(A.jsx)(Y, {
                        className: "minting-button",
                        disabled: (null === c || void 0 === c ? void 0 : c.state.isSoldOut) || u || D || !(T || P),
                        onClick: Object(o.a)(b.a.mark((function e() {
                            var t;
                            return b.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (x(!0), null === c || void 0 === c || !c.state.isActive || null === c || void 0 === c || !c.state.gatekeeper) {
                                            e.next = 15;
                                            break
                                        }
                                        if (console.log("gatekeeper active"), j !== S.b.ACTIVE) {
                                            e.next = 8;
                                            break
                                        }
                                        console.log(j + S.b.ACTIVE), x(!0), e.next = 13;
                                        break;
                                    case 8:
                                        return console.log("requeting token"), e.next = 11, h();
                                    case 11:
                                        t = e.sent, console.log(t);
                                    case 13:
                                        e.next = 18;
                                        break;
                                    case 15:
                                        return e.next = 17, s();
                                    case 17:
                                        x(!1);
                                    case 18:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        }))),
                        variant: "contained",
                        children: Object(A.jsx)("div", {
                            className: "mint-button-text",
                            children: null !== c && void 0 !== c && c.state.isSoldOut ? "SOLD OUT" : u ? Object(A.jsx)(k.a, {}) : D ? "Mint Paused" : "MINT"
                        })
                    })
                },
                V = n(371),
                z = n(185),
                J = n(366),
                Q = n(396),
                Z = Object(J.a)((function(e) {
                    return Object(Q.a)({
                        root: {
                            display: "flex",
                            padding: e.spacing(0),
                            "& > *": {
                                margin: e.spacing(.5),
                                marginRight: 0,
                                width: e.spacing(6),
                                height: e.spacing(6),
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#384457",
                                color: "white",
                                borderRadius: 5,
                                fontSize: 10
                            }
                        },
                        done: {
                            display: "flex",
                            margin: e.spacing(1),
                            marginRight: 0,
                            padding: e.spacing(1),
                            flexDirection: "column",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#384457",
                            color: "white",
                            borderRadius: 5,
                            fontWeight: "bold",
                            fontSize: 18
                        },
                        item: {
                            fontWeight: "bold",
                            fontSize: 18
                        }
                    })
                })),
                X = function(e) {
                    var t = e.date,
                        n = e.status,
                        r = e.style,
                        i = e.start,
                        s = e.end,
                        c = e.onComplete,
                        o = Z(),
                        u = Object(a.useState)(!!(i && s && t) && i.getTime() - Date.now() < 0),
                        d = Object(l.a)(u, 2),
                        b = d[0],
                        h = (d[1], function(e) {
                            var t = e.days,
                                a = e.hours,
                                i = e.minutes,
                                s = e.seconds;
                            return a += 24 * t, e.completed ? n ? Object(A.jsx)("span", {
                                className: o.done,
                                children: n
                            }) : null : Object(A.jsxs)("div", {
                                className: o.root,
                                style: r,
                                children: [b && Object(A.jsx)(f.a, {
                                    elevation: 0,
                                    children: Object(A.jsx)("span", {
                                        className: o.item,
                                        children: "+"
                                    })
                                }), Object(A.jsxs)(f.a, {
                                    elevation: 0,
                                    children: [Object(A.jsx)("span", {
                                        className: o.item,
                                        children: a < 10 ? "0".concat(a) : a
                                    }), Object(A.jsx)("span", {
                                        children: "hrs"
                                    })]
                                }), Object(A.jsxs)(f.a, {
                                    elevation: 0,
                                    children: [Object(A.jsx)("span", {
                                        className: o.item,
                                        children: i < 10 ? "0".concat(i) : i
                                    }), Object(A.jsx)("span", {
                                        children: "mins"
                                    })]
                                }), Object(A.jsxs)(f.a, {
                                    elevation: 0,
                                    children: [Object(A.jsx)("span", {
                                        className: o.item,
                                        children: s < 10 ? "0".concat(s) : s
                                    }), Object(A.jsx)("span", {
                                        children: "secs"
                                    })]
                                })]
                            })
                        });
                    return t && i && s && b && z.a, t ? Object(A.jsx)(z.a, {
                        date: t,
                        onComplete: c,
                        renderer: h
                    }) : null
                };
            ! function(e) {
                e[e.AnticipationPhase = 0] = "AnticipationPhase", e[e.SetPrice = 1] = "SetPrice", e[e.GracePeriod = 2] = "GracePeriod", e[e.Lottery = 3] = "Lottery", e[e.RaffleFinished = 4] = "RaffleFinished", e[e.WaitForCM = 5] = "WaitForCM", e[e.Phase4 = 6] = "Phase4", e[e.MintOff = 7] = "MintOff", e[e.WhiteListMint = 8] = "WhiteListMint", e[e.PublicMint = 9] = "PublicMint", e[e.Welcome = 10] = "Welcome", e[e.Panic = 11] = "Panic"
            }(W || (W = {}));
            var $, ee, te = function(e) {
                    var t = e.phaseName,
                        n = e.desc,
                        a = e.date,
                        r = e.status,
                        i = e.countdownEnable;
                    return Object(A.jsxs)(A.Fragment, {
                        children: [!0 === i && Object(A.jsx)(m.a, {
                            container: !0,
                            style: {
                                position: "absolute",
                                top: "-30px",
                                left: "0px"
                            },
                            children: Object(A.jsx)(j.a, {
                                style: {
                                    justifyContent: "center"
                                },
                                children: Object(A.jsx)(X, {
                                    date: Object(G.f)(a),
                                    style: {
                                        justifyContent: "center"
                                    },
                                    status: r || "COMPLETE"
                                })
                            })
                        }), Object(A.jsx)(m.a, {
                            container: !0,
                            className: "mintHeader",
                            alignItems: "center",
                            children: Object(A.jsx)(m.a, {
                                children: Object(A.jsx)(V.a, {
                                    variant: "h5",
                                    style: {
                                        fontWeight: 600,
                                        textAlign: "center"
                                    },
                                    className: "pb-2",
                                    children: t
                                })
                            })
                        }), n && Object(A.jsx)(V.a, {
                            className: "pb-2",
                            variant: "body1",
                            color: "textSecondary",
                            children: n
                        })]
                    })
                },
                ne = function(e) {
                    var t = e.phase,
                        n = e.candyMachine,
                        a = Object(O.b)();
                    return console.log("D", n), console.log("Wallet", a), Object(A.jsxs)(A.Fragment, {
                        children: [t === W.Panic && Object(A.jsx)(te, {
                            phaseName: I,
                            desc: K
                        }), t === W.Welcome && Object(A.jsx)(te, {
                            phaseName: L.title,
                            desc: L.desc,
                            date: L.countdownTo,
                            countdownEnable: L.countdownEnable
                        }), t === W.WhiteListMint && Object(A.jsx)(A.Fragment, {
                            children: Object(A.jsx)(te, {
                                phaseName: _.title,
                                desc: _.desc,
                                date: _.endDate,
                                countdownEnable: _.countdown,
                                status: "WHITELIST LIVE"
                            })
                        }), t === W.PublicMint && Object(A.jsx)(A.Fragment, {
                            children: Object(A.jsx)(te, {
                                phaseName: H.title,
                                desc: H.desc,
                                date: H.endDate,
                                countdownEnable: H.countdown,
                                status: "LIVE"
                            })
                        })]
                    })
                },
                ae = Object(h.a)(v.a)($ || ($ = Object(u.a)(["\n  position: absolute;\n  left: 0px;\n  bottom: -15px;\n  width: 100%;\n  height: 60px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  background: linear-gradient(180deg, #021627 0%, #021627 100%);\n  border: 1px solid #eead0e;\n  color: white;\n  font-size: 16px;\n  font-weight: bold;\n  transform: translate(0%, -50%);\n"]))),
                re = h.a.div(ee || (ee = Object(u.a)(["\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  bottom: 15px;\n"]))),
                ie = function(e) {
                    var t, n, r = e.rpcHost,
                        i = Object(a.useState)(0),
                        s = Object(l.a)(i, 2),
                        u = s[0],
                        d = s[1],
                        h = Object(a.useState)(!1),
                        v = Object(l.a)(h, 2),
                        w = v[0],
                        k = v[1],
                        T = Object(a.useState)(null),
                        N = Object(l.a)(T, 2),
                        P = N[0],
                        M = N[1],
                        C = Object(a.useState)(null),
                        R = Object(l.a)(C, 2),
                        E = R[0],
                        I = R[1],
                        K = Object(a.useState)(),
                        Y = Object(l.a)(K, 2),
                        V = Y[0],
                        z = Y[1],
                        J = Object(a.useState)(),
                        Q = Object(l.a)(J, 2),
                        Z = Q[0],
                        X = Q[1],
                        $ = Object(a.useState)(null),
                        ee = Object(l.a)($, 2),
                        te = ee[0],
                        ie = ee[1],
                        se = Object(O.b)(),
                        ce = Object(a.useMemo)((function() {
                            if (se && se.publicKey && se.signAllTransactions && se.signTransaction) return {
                                publicKey: se.publicKey,
                                signAllTransactions: se.signAllTransactions,
                                signTransaction: se.signTransaction
                            }
                        }), [se]),
                        oe = Object(a.useState)({
                            open: !1,
                            message: "",
                            severity: void 0
                        }),
                        le = Object(l.a)(oe, 2),
                        ue = le[0],
                        de = le[1],
                        be = function() {
                            var t = Object(o.a)(b.a.mark((function t() {
                                var n, a, r, i, s;
                                return b.a.wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                        case 0:
                                            if (t.prev = 0, k(!0), null === (n = document.getElementById("#identity")) || void 0 === n || n.click(), !(se.connected && null !== Z && void 0 !== Z && Z.program && se.publicKey)) {
                                                t.next = 13;
                                                break
                                            }
                                            return t.next = 6, Object(y.d)(Z, se.publicKey);
                                        case 6:
                                            if (r = t.sent[0], i = {
                                                    err: !0
                                                }, !r) {
                                                t.next = 12;
                                                break
                                            }
                                            return t.next = 11, Object(y.b)(r, e.txTimeout, e.connection, "singleGossip", !0);
                                        case 11:
                                            i = t.sent;
                                        case 12:
                                            null !== (a = i) && void 0 !== a && a.err ? de({
                                                open: !0,
                                                message: "Mint failed! Please try again!",
                                                severity: "error"
                                            }) : (de({
                                                open: !0,
                                                message: "Congratulations! Mint succeeded!",
                                                severity: "success"
                                            }), M(P + 1), u && u > 0 && d(u - 1));
                                        case 13:
                                            t.next = 20;
                                            break;
                                        case 15:
                                            t.prev = 15, t.t0 = t.catch(0), s = t.t0.msg || "Minting failed! Please try again!", t.t0.msg ? 311 === t.t0.code ? (s = "SOLD OUT!", window.location.reload()) : 312 === t.t0.code && (s = "Minting period hasn't started yet.") : t.t0.message ? t.t0.message.indexOf("0x138") || (t.t0.message.indexOf("0x137") ? s = "SOLD OUT!" : t.t0.message.indexOf("0x135") && (s = "Insufficient funds to mint. Please fund your wallet.")) : s = "Transaction Timeout! Please try again.", de({
                                                open: !0,
                                                message: s,
                                                severity: "error"
                                            });
                                        case 20:
                                            return t.prev = 20, k(!1), t.finish(20);
                                        case 23:
                                        case "end":
                                            return t.stop()
                                    }
                                }), t, null, [
                                    [0, 15, 20, 23]
                                ])
                            })));
                            return function() {
                                return t.apply(this, arguments)
                            }
                        }();
                    Object(a.useEffect)((function() {
                        Object(o.a)(b.a.mark((function t() {
                            var n;
                            return b.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (ce) {
                                            t.next = 3;
                                            break
                                        }
                                        return console.log("anchor wallet not found"), t.abrupt("return");
                                    case 3:
                                        if (console.log("wallet connected"), ce.publicKey && z(ce.publicKey), !e.candyMachineId) {
                                            t.next = 20;
                                            break
                                        }
                                        return t.prev = 6, t.next = 9, Object(y.c)(ce, e.candyMachineId, e.connection);
                                    case 9:
                                        return n = t.sent, t.next = 12, X(n);
                                    case 12:
                                        t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t.catch(6), console.log("Problem getting candy machine state"), console.log(t.t0);
                                    case 18:
                                        t.next = 21;
                                        break;
                                    case 20:
                                        console.log("No candy machine detected in configuration.");
                                    case 21:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [6, 14]
                            ])
                        })))()
                    }), [ce, e.candyMachineId, e.connection]), Object(a.useEffect)((function() {
                        function t() {
                            return (t = Object(o.a)(b.a.mark((function t() {
                                var n, a, r;
                                return b.a.wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                        case 0:
                                            if (!V || null === Z || void 0 === Z || null === (n = Z.state.whitelistMintSettings) || void 0 === n || !n.mint) {
                                                t.next = 11;
                                                break
                                            }
                                            return t.prev = 1, t.next = 4, e.connection.getParsedTokenAccountsByOwner(V, {
                                                mint: null === Z || void 0 === Z || null === (a = Z.state.whitelistMintSettings) || void 0 === a ? void 0 : a.mint
                                            });
                                        case 4:
                                            return r = t.sent, t.abrupt("return", r.value[0].account.data.parsed.info.tokenAmount.amount);
                                        case 8:
                                            return t.prev = 8, t.t0 = t.catch(1), t.abrupt("return", 0);
                                        case 11:
                                        case "end":
                                            return t.stop()
                                    }
                                }), t, null, [
                                    [1, 8]
                                ])
                            })))).apply(this, arguments)
                        }(function() {
                            return t.apply(this, arguments)
                        })().then((function(e) {
                            var t, n;
                            (d(e), null !== Z && void 0 !== Z && null !== (t = Z.state.whitelistMintSettings) && void 0 !== t && t.discountPrice && e) ? ie((null === Z || void 0 === Z || null === (n = Z.state.whitelistMintSettings) || void 0 === n ? void 0 : n.discountPrice.toNumber()) / 1e9): null !== Z && void 0 !== Z && Z.state.price && ie((null === Z || void 0 === Z ? void 0 : Z.state.price.toNumber()) / 1e9)
                        })), null !== Z && void 0 !== Z && Z.state.itemsAvailable && I(null === Z || void 0 === Z ? void 0 : Z.state.itemsAvailable), null == (null === Z || void 0 === Z ? void 0 : Z.state.itemsRedeemed) ? M(0) : M(null === Z || void 0 === Z ? void 0 : Z.state.itemsRedeemed)
                    }), [Z, V, e.connection]);
                    var he = function(e) {
                        var t, n, a, r = (new Date).getTime(),
                            i = null === (t = Object(G.f)(_.startDate)) || void 0 === t ? void 0 : t.getTime(),
                            s = null === (n = Object(G.f)(_.endDate)) || void 0 === n ? void 0 : n.getTime(),
                            c = null === (a = Object(G.f)(H.startDate)) || void 0 === a ? void 0 : a.getTime();
                        return !0 === D ? W.Panic : c && r > c ? W.PublicMint : _.enabled && i && s && r > i && r < s ? W.WhiteListMint : W.Welcome
                    }();
                    return Object(A.jsxs)(j.a, {
                        children: [Object(A.jsx)(j.a, {
                            maxWidth: "xs",
                            style: {
                                position: "relative"
                            },
                            children: Object(A.jsx)(f.a, {
                                style: {
                                    padding: "34px 24px 90px 24px",
                                    display: "flex",
                                    borderRadius: 6
                                },
                                className: "minting-box",
                                children: Object(A.jsxs)(m.a, {
                                    container: !0,
                                    justifyContent: "space-between",
                                    direction: "column",
                                    children: [Object(A.jsx)(ne, {
                                        phase: he,
                                        candyMachine: Z,
                                        rpcUrl: r
                                    }), Object(A.jsxs)("div", {
                                        children: [he === W.Welcome && L.enableCustomHTML && Object(A.jsx)(F, {}), he === W.WhiteListMint && _.enableCustomHTML && Object(A.jsx)(B, {}), he === W.PublicMint && H.enableCustomHTML && Object(A.jsx)(U, {}), (he === W.PublicMint || W.WhiteListMint) && Object(A.jsxs)(A.Fragment, {
                                            children: [he === W.WhiteListMint && Object(A.jsxs)("div", {
                                                className: "card minting-info text-center",
                                                children: [u >= 0 ? Object(A.jsx)("h1", {
                                                    children: u
                                                }) : Object(A.jsx)("div", {
                                                    className: "loading"
                                                }), Object(A.jsx)("div", {
                                                    children: Object(A.jsx)("p", {
                                                        children: "Mints to Claim"
                                                    })
                                                })]
                                            }), Object(A.jsxs)(m.a, {
                                                container: !0,
                                                justifyContent: "space-between",
                                                color: "textSecondary",
                                                children: [Object(A.jsx)("div", {
                                                    className: "test-stat",
                                                    children: (he === W.WhiteListMint || he === W.PublicMint) && (null !== E && null !== P ? Object(A.jsx)("p", {
                                                        children: P + " / " + E
                                                    }) : Object(A.jsx)("p", {
                                                        className: "loading"
                                                    }))
                                                }), Object(A.jsx)("div", {
                                                    className: "text-end",
                                                    children: he === W.Welcome && L.showPrice || he === W.WhiteListMint || he === W.PublicMint ? Object(A.jsx)(A.Fragment, {
                                                        children: te ? Object(A.jsxs)("p", {
                                                            children: [te, " Sol"]
                                                        }) : Object(A.jsx)("p", {
                                                            className: "loading"
                                                        })
                                                    }) : ""
                                                })]
                                            }), se.connected ? Object(A.jsx)(re, {
                                                children: null !== Z && void 0 !== Z && Z.state.isActive && null !== Z && void 0 !== Z && Z.state.gatekeeper && se.publicKey && se.signTransaction ? Object(A.jsx)(S.a, {
                                                    wallet: {
                                                        publicKey: se.publicKey || new g.PublicKey(y.a),
                                                        signTransaction: se.signTransaction
                                                    },
                                                    gatekeeperNetwork: null === Z || void 0 === Z || null === (t = Z.state) || void 0 === t || null === (n = t.gatekeeper) || void 0 === n ? void 0 : n.gatekeeperNetwork,
                                                    clusterUrl: r,
                                                    options: {
                                                        autoShowModal: !1
                                                    },
                                                    children: Object(A.jsx)(q, {
                                                        candyMachine: Z,
                                                        isMinting: w,
                                                        onMint: be
                                                    })
                                                }) : Object(A.jsx)(q, {
                                                    candyMachine: Z,
                                                    isMinting: w,
                                                    onMint: be
                                                })
                                            }) : Object(A.jsxs)(ae, {
                                                children: ["Connect", ""]
                                            })]
                                        })]
                                    })]
                                })
                            })
                        }), Object(A.jsx)(p.a, {
                            open: ue.open,
                            autoHideDuration: 6e3,
                            onClose: function() {
                                return de(Object(c.a)(Object(c.a)({}, ue), {}, {
                                    open: !1
                                }))
                            },
                            children: Object(A.jsx)(x.a, {
                                onClose: function() {
                                    return de(Object(c.a)(Object(c.a)({}, ue), {}, {
                                        open: !1
                                    }))
                                },
                                severity: ue.severity,
                                children: ue.message
                            })
                        })]
                    })
                },
                se = n(383),
                ce = n(384),
                oe = n(395),
                le = n(389),
                ue = n(93),
                de = n.n(ue),
                be = n(391),
                he = n(392),
                je = n(387),
                pe = n(393),
                fe = n(394),
                me = n(388),
                xe = n(227),
                ge = n(379),
                Oe = Object(xe.a)({
                    palette: {
                        type: "dark"
                    }
                }),
                ve = "https://trashpandas.rpcpool.com",
                ye = new C.e.Connection(ve),
                we = parseInt(Object({
                    NODE_ENV: "production",
                    PUBLIC_URL: "",
                    WDS_SOCKET_HOST: void 0,
                    WDS_SOCKET_PATH: void 0,
                    WDS_SOCKET_PORT: void 0,
                    FAST_REFRESH: !0,
                    REACT_APP_CANDY_MACHINE_ID: "",
                    REACT_APP_SOLANA_NETWORK: "mainnet-beta",
                    REACT_APP_SOLANA_RPC_HOST: "https://trashpandas.rpcpool.com"
                }).REACT_APP_CANDY_START_DATE, 10),
                ke = function() {
                    var e = Object(a.useMemo)((function() {
                            return Object(g.clusterApiUrl)("mainnet-beta")
                        }), []),
                        t = Object(a.useMemo)((function() {
                            return [Object(be.a)(), Object(he.a)(), Object(je.a)(), Object(pe.a)()]
                        }), []);

                    function n() {
                        document.getElementById("mobileNavContainer").classList.toggle("open-menu"), console.log("pressed")
                    }
                    return Object(A.jsxs)("div", {
                        children: [Object(A.jsxs)("div", {
                            id: "mobileNavContainer",
                            className: "mobile-nav",
                            children: [Object(A.jsx)("div", {
                                className: "mobile-nav-close-button",
                                children: Object(A.jsx)("img", {
                                    src: "/icons/close.svg",
                                    alt: "",
                                    onClick: n
                                })
                            }), Object(A.jsxs)("ul", {
                                children: [Object(A.jsx)("li", {
                                    children: Object(A.jsx)("img", {
                                        className: "mobile-nav-logo",
                                        src: "/img/logo.png",
                                        alt: ""
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsx)("a", {
                                        href: "/#link1",
                                        onClick: n,
                                        children: "Mint"
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsx)("a", {
                                        href: "/#about",
                                        onClick: n,
                                        children: "About"
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsx)("a", {
                                        href: "/#utilities",
                                        onClick: n,
                                        children: "Utility"
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsx)("a", {
                                        href: "/#roadmap",
                                        onClick: n,
                                        children: "Roadmap"
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsx)("a", {
                                        href: "/#faq",
                                        onClick: n,
                                        children: "FAQ"
                                    })
                                }), Object(A.jsx)("li", {
                                    children: Object(A.jsxs)("div", {
                                        className: "social-icons",
                                        children: [Object(A.jsx)("a", {
                                            href: "https://twitter.com",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: Object(A.jsx)("img", {
                                                className: "nav-social",
                                                src: "/icons/twitter.svg",
                                                alt: ""
                                            })
                                        }), Object(A.jsx)("a", {
                                            href: "https://discord.com",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: Object(A.jsx)("img", {
                                                className: "nav-social",
                                                src: "/icons/discord.svg",
                                                alt: ""
                                            })
                                        })]
                                    })
                                })]
                            })]
                        }), Object(A.jsx)("div", {
                            className: "mobile-menu-button",
                            onClick: n,
                            children: Object(A.jsx)("img", {
                                src: "/icons/menu.svg",
                                alt: ""
                            })
                        }), Object(A.jsx)("nav", {
                            children: Object(A.jsxs)("div", {
                                className: "nav-container",
                                children: [Object(A.jsx)("img", {
                                    className: "nav-logo",
                                    src: "/img/logo.png",
                                    alt: ""
                                }), Object(A.jsx)("a", {
                                    className: "hide-800",
                                    href: "/#link1",
                                    children: "Mint"
                                }), Object(A.jsx)("a", {
                                    className: "hide-800",
                                    href: "/#about",
                                    children: "About"
                                }), Object(A.jsx)("a", {
                                    className: "hide-800",
                                    href: "/#utilities",
                                    children: "Utility"
                                }), Object(A.jsx)("a", {
                                    className: "hide-800",
                                    href: "/#roadmap",
                                    children: "Roadmap"
                                }), Object(A.jsx)("a", {
                                    className: "hide-800",
                                    href: "/#faq",
                                    children: "FAQ"
                                }), Object(A.jsxs)("div", {
                                    className: "social-icons hide-800",
                                    children: [Object(A.jsx)("a", {
                                        href: "https://twitter.com",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: Object(A.jsx)("img", {
                                            className: "nav-social",
                                            src: "/icons/twitter.svg",
                                            alt: ""
                                        })
                                    }), Object(A.jsx)("a", {
                                        href: "https://discord.com",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: Object(A.jsx)("img", {
                                            className: "nav-social",
                                            src: "/icons/discord.svg",
                                            alt: ""
                                        })
                                    })]
                                })]
                            })
                        }), Object(A.jsx)("div", {
                            className: "topbanner",
                            children: Object(A.jsx)("img", {
                                src: "assets/banner.png",
                                alt: "topbanner"
                            })
                        }), Object(A.jsxs)("div", {
                            className: "content-wrapper",
                            children: [Object(A.jsxs)("header", {
                                className: "card",
                                id: "link1",
                                children: [Object(A.jsxs)("div", {
                                    className: "home",
                                    style: {
                                        padding: "0 24px 0 24px 0"
                                    },
                                    children: [Object(A.jsx)("h3", {
                                        className: "text-secondary-color",
                                        children: "Welcome To"
                                    }), Object(A.jsx)("h1", {
                                        className: "pb-3",
                                        children: "Royal Cats"
                                    }), Object(A.jsx)("p", {
                                        className: "text-secondary-color",
                                        children: "Royal Cats are a collection of 1000 randomly generated NFTs from 6 base characters and 124 unique attributes! Our talented artist has designed each NFT to be randomly generated with a combination of base characters, backgrounds, and different traits. The Royal Cat NFT community will provide all of its owners with abundant benefits and limitless possibilities. The different NFT characters are chosen such that everyone can identify with one of them. Get ready to join the royal family!"
                                    })]
                                }), Object(A.jsx)("div", {
                                    children: Object(A.jsx)(ge.a, {
                                        theme: Oe,
                                        children: Object(A.jsx)(fe.a, {
                                            endpoint: e,
                                            children: Object(A.jsx)(me.a, {
                                                wallets: t,
                                                autoConnect: !0,
                                                children: Object(A.jsx)(v.b, {
                                                    children: Object(A.jsx)(ie, {
                                                        candyMachineId: undefined,
                                                        connection: ye,
                                                        startDate: we,
                                                        txTimeout: 3e4,
                                                        rpcHost: ve
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })]
                            }), Object(A.jsxs)("section", {
                                id: "about",
                                children: [Object(A.jsxs)("div", {
                                    className: "aboutinfo",
                                    children: [Object(A.jsx)("h1", {
                                        children: "About the collection"
                                    }), Object(A.jsxs)("p", {
                                        children: ["The noble family Debenham resides in the very sleepy village of Westbury. It is a place that still embodies the rural life of England. Brick houses, narrow streets and a marketplace where social life takes place. And of course, also a church, a hotel and two pubs, a small department store, as well as a butcher and a baker.", Object(A.jsx)("br", {}), Object(A.jsx)("br", {}), "Just outside the village connected to a road lined with trees and reminiscent of an avenue in Tuscany, stands Westbury Hall: the family seat of the Debanham's."]
                                    })]
                                }), Object(A.jsxs)("div", {
                                    className: "characters",
                                    children: [Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/count.png",
                                            alt: "count"
                                        }), Object(A.jsx)("h1", {
                                            children: "Count Edmond Fitz Allen Debenham, 53 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "The head of the family, very smart and fair to his children. His money originates from his ancestors and a number of hotels, which are owned by the family. He is a passionate hunter, loves dogs and generally just wants to live in peace."
                                        })]
                                    }), Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/countess.png",
                                            alt: "countess"
                                        }), Object(A.jsx)("h1", {
                                            children: "Countess Maria Debanham, 45 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "German by birth and the driving force of the family. She cares intensively for the estate and her three children. Her beautiful roses in the garden and fundraising galas are her passion."
                                        })]
                                    })]
                                }), Object(A.jsxs)("div", {
                                    className: "characters",
                                    children: [Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/son.png",
                                            alt: "son"
                                        }), Object(A.jsx)("h1", {
                                            children: "Conner, the son and progenitor, 23 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "He is the secret playboy of the family. Loves fast cars and grows pot in the flower house together with the gardener, which he shares with his friends. Goes to the casino and horse races, bets on every sporting event. More often than not he is stoned and just enjoys life without his parents suspecting anything. He lives on the money of his parents and on his bets - when he wins."
                                        })]
                                    }), Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/old.png",
                                            alt: "old"
                                        }), Object(A.jsx)("h1", {
                                            children: "Alice the daughter, 22 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "Very pretty, overly present on social media and a straight-up party girl. Attends university in Bristol, takes probably 50 selfies a day and never misses an opportunity to present herself in the limelight. She goes to concerts and events a lot to meet other celebrities and enjoys to go horseback riding."
                                        })]
                                    }), Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/young.png",
                                            alt: "young"
                                        }), Object(A.jsx)("h1", {
                                            children: "Brooke the youngest daughter, 16 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "Goes to private school in Bath and is the environmental activist in the family. Also takes part in the Friday4Future demos, much to the mother's disapproval."
                                        })]
                                    })]
                                }), Object(A.jsx)("div", {
                                    className: "characters",
                                    children: Object(A.jsxs)("div", {
                                        className: "character",
                                        children: [Object(A.jsx)("img", {
                                            src: "assets/butler.png",
                                            alt: "butler"
                                        }), Object(A.jsx)("h1", {
                                            children: "Alfred the butler, 60 years old"
                                        }), Object(A.jsx)("p", {
                                            children: "A typical stiff English butler, loyal to the master of the house, but turning a blind eye to Conner."
                                        })]
                                    })
                                })]
                            }), Object(A.jsxs)("section", {
                                id: "utilities",
                                children: [Object(A.jsxs)("div", {
                                    className: "toputil",
                                    children: [Object(A.jsx)("h1", {
                                        children: "Utility"
                                    }), Object(A.jsx)("p", {
                                        children: "All NFTs entitle you to the benefits mentioned below, but some are rarer than others. For a full overview of rarities and benefits, click here (link to follow). "
                                    })]
                                }), Object(A.jsxs)("div", {
                                    className: "utility",
                                    children: [Object(A.jsx)("img", {
                                        src: "assets/rights.svg",
                                        alt: "rights"
                                    }), Object(A.jsxs)("div", {
                                        className: "textutil",
                                        children: [Object(A.jsx)("h1", {
                                            children: "Exclusive rights"
                                        }), Object(A.jsx)("p", {
                                            children: "When you are a certified owner of a Royal Cats NFT, you receive exclusive IP rights to your unique NFT for personal and commercial use."
                                        })]
                                    })]
                                }), Object(A.jsx)("hr", {}), Object(A.jsxs)("div", {
                                    className: "utility",
                                    children: [Object(A.jsx)("img", {
                                        src: "assets/community.svg",
                                        alt: "com"
                                    }), Object(A.jsxs)("div", {
                                        className: "textutil",
                                        children: [Object(A.jsx)("h1", {
                                            children: "Ambitious community"
                                        }), Object(A.jsx)("p", {
                                            children: "Be part of launching this ambitious community. Shared goals equal shared success. Let's all grow together. "
                                        })]
                                    })]
                                }), Object(A.jsx)("hr", {}), Object(A.jsxs)("div", {
                                    className: "utility",
                                    children: [Object(A.jsx)("img", {
                                        src: "assets/perks.svg",
                                        alt: "perks"
                                    }), Object(A.jsxs)("div", {
                                        className: "textutil",
                                        children: [Object(A.jsx)("h1", {
                                            children: "Perks"
                                        }), Object(A.jsx)("p", {
                                            children: "Exclusive rewards, airdrops and premium Royal Cats collectibles will be available for purchase to NFT holders."
                                        })]
                                    })]
                                })]
                            }), Object(A.jsxs)("section", {
                                id: "roadmap",
                                children: [Object(A.jsx)("h1", {
                                    children: "Roadmap"
                                }), Object(A.jsxs)("p", {
                                    children: ["We will continue to develop and expand the Royal Cats brand. We have ambitious plans, including the launch additional NFT collections and collaborations with other renowned NFT projects. Amongst the first steps will be opening of a merch store offering Royal Cats brand merchandise as well as fundraising events and raffles.", Object(A.jsx)("br", {}), Object(A.jsx)("br", {}), "We have plenty of ideas for the future of Royal Cats, so join us on this journey as we launch our project and expand the Royal Cats universe!"]
                                })]
                            }), Object(A.jsxs)("section", {
                                id: "faq",
                                children: [Object(A.jsx)("h1", {
                                    children: "FAQ"
                                }), Object(A.jsx)("br", {}), Object(A.jsx)("br", {}), Object(A.jsx)("br", {}), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "What is the mint price?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "The mint price in pre-sale is 0.5 sol and on public sale is 0.8 sol."
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "When is the start date?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "Saturday, 01 May at 20:00 UTC presale and Tuesday, 03 May public sale."
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "What is the utility?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "Royal Cats holders will own unique and personalized NFT artwork. Holders will have access to the Royal Cats community, exclusive giveaways for holders, contests, priority whitelisting for future collections, and more!"
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "How do I mint?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsxs)(le.a, {
                                            children: ["1. Log into your Phantom wallet or download the extension in your internet browser. ", Object(A.jsx)("br", {}), "2. Connect to your wallet.", Object(A.jsx)("br", {}), "3. Click on the mint button and you will be prompted to sign your transaction. ", Object(A.jsx)("br", {}), "4. Once you have made the purchase, your Royal Cats NFT will appear in your wallet and also on select secondary marketplaces! ", Object(A.jsx)("br", {})]
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "Where can I see my purchased NFT?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "Your Royal Cats NFT will appear in any address or linked wallet you used to make your purchase. You can also see your freshly minted NFT directly on your Opensea (to be validated) account."
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "Where will I be Able to Buy & Sell (Secondary Market)?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "We will be listed on Magic Eden & Solanart right after the Mint."
                                        })
                                    })]
                                }), Object(A.jsxs)(se.a, {
                                    children: [Object(A.jsx)(ce.a, {
                                        expandIcon: Object(A.jsx)(de.a, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: Object(A.jsx)(le.a, {
                                            children: "How much is the Royalty Fees?"
                                        })
                                    }), Object(A.jsx)(oe.a, {
                                        children: Object(A.jsx)(le.a, {
                                            children: "The royalty fee is set to 7%, it is important for us to disclose this before the mint because most projects didn\u2019t disclose that."
                                        })
                                    })]
                                })]
                            })]
                        }), Object(A.jsx)("footer", {
                            children: Object(A.jsx)("h3", {
                                children: "Copyright 2022 Royal Cats"
                            })
                        })]
                    })
                },
                Se = function(e) {
                    e && e instanceof Function && n.e(3).then(n.bind(null, 398)).then((function(t) {
                        var n = t.getCLS,
                            a = t.getFID,
                            r = t.getFCP,
                            i = t.getLCP,
                            s = t.getTTFB;
                        n(e), a(e), r(e), i(e), s(e)
                    }))
                };
            s.a.render(Object(A.jsx)(r.a.StrictMode, {
                children: Object(A.jsx)(ke, {})
            }), document.getElementById("root")), Se()
        },
        47: function(e, t, n) {
            "use strict";
            (function(e) {
                n.d(t, "f", (function() {
                    return o
                })), n.d(t, "b", (function() {
                    return l
                })), n.d(t, "a", (function() {
                    return u
                })), n.d(t, "c", (function() {
                    return d
                })), n.d(t, "d", (function() {
                    return b
                })), n.d(t, "e", (function() {
                    return h
                }));
                var a = n(6),
                    r = n(1),
                    i = n.n(r),
                    s = n(26),
                    c = n(42),
                    o = (n(7), new s.e.PublicKey("faircnAB9k59Y4TXmLabBULeuTLgV7TkGMGNkjnA15j"), function(e) {
                        if (e) return new Date(1e3 * e.toNumber())
                    }),
                    l = (new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }), new s.e.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")),
                    u = new s.e.PublicKey("gatem74V238djXdzWnJf94Wo1DcnuGkfijbf3AuBhfs"),
                    d = function() {
                        var e = Object(a.a)(i.a.mark((function e(t, n) {
                            return i.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, s.e.PublicKey.findProgramAddress([n.toBuffer(), c.b.toBuffer(), t.toBuffer()], l);
                                    case 2:
                                        return e.abrupt("return", e.sent);
                                    case 3:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function(t, n) {
                            return e.apply(this, arguments)
                        }
                    }(),
                    b = function() {
                        var t = Object(a.a)(i.a.mark((function t(n) {
                            return i.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, s.e.PublicKey.findProgramAddress([n.toBuffer(), e.from("expire")], u);
                                    case 2:
                                        return t.abrupt("return", t.sent);
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(),
                    h = function() {
                        var t = Object(a.a)(i.a.mark((function t(n, a) {
                            return i.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, s.e.PublicKey.findProgramAddress([n.toBuffer(), e.from("gateway"), e.from([0, 0, 0, 0, 0, 0, 0, 0]), a.toBuffer()], u);
                                    case 2:
                                        return t.abrupt("return", t.sent);
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function(e, n) {
                            return t.apply(this, arguments)
                        }
                    }()
            }).call(this, n(21).Buffer)
        }
    },
    [
        [319, 1, 2]
    ]
]);
//# sourceMappingURL=main.0b9e7a0c.chunk.js.map